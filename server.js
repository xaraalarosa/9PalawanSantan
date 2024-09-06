const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/education-hub', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Schema and Model for Confessions with TTL (expireAfterSeconds: 86400 = 24 hours)
const confessionSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now, expires: 86400 } // TTL set to 24 hours
});

const Confession = mongoose.model('Confession', confessionSchema);

// Middleware
app.use(express.static('public'));
app.use(express.json()); // To handle JSON data from the frontend

// Multer configuration for handling file uploads
const upload = multer({ 
    dest: 'public/uploads/', // Ensure this path is accessible
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// Route for uploading pictures
app.post('/upload-picture', upload.single('picture'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`Picture uploaded successfully: /uploads/${req.file.filename}`);
});

// Route for posting confessions
app.post('/confession', async (req, res) => {
    try {
        const confession = new Confession({ text: req.body.text });
        await confession.save();
        res.send('Confession posted successfully.');
    } catch (err) {
        res.status(500).send('Error saving confession.');
    }
});

// Route to get all confessions
app.get('/confessions', async (req, res) => {
    try {
        const confessions = await Confession.find();
        res.json(confessions);
    } catch (err) {
        res.status(500).send('Error retrieving confessions.');
    }
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});