const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// In-memory store for confessions
let confessions = [];

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/', // Directory to save uploaded files
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type'));
        }
        cb(null, true);
    }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to handle picture uploads
app.post('/upload-picture', upload.single('picture'), (req, res) => {
    if (req.file) {
        const fileUrl = `/uploads/${req.file.filename}`;
        res.send(fileUrl); // Send the URL of the uploaded file to the client
    } else {
        res.status(400).send('No file uploaded.');
    }
});

// Endpoint to handle fetching confessions
app.get('/confessions', (req, res) => {
    const now = new Date();
    // Filter out expired confessions
    const validConfessions = confessions.filter(confession => {
        return (now - new Date(confession.createdAt)) < (24 * 60 * 60 * 1000); // 24 hours in milliseconds
    });
    res.json(validConfessions);
});

// Endpoint to handle posting confessions
app.post('/confessions', express.json(), (req, res) => {
    const confession = req.body;
    if (confession.text) {
        // Add a timestamp to the confession
        confession.createdAt = new Date();
        confessions.push(confession);
        res.send('Confession posted successfully');
    } else {
        res.status(400).send('Confession text is required');
    }
});

// Create 'uploads' directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
