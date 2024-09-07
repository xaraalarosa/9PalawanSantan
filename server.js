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
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 } // TTL set to 24 hours
});

const Confession = mongoose.model('Confession', confessionSchema);

// Multer configuration for handling file uploads
const upload = multer({ 
    dest: path.join(__dirname, 'public', 'uploads'), // Ensure the path is correct
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // To handle JSON data from the frontend

// Route for uploading pictures
app.post('/upload-picture', upload.single('picture'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`/uploads/${req.file.filename}`); // Send relative URL
});

// Route for posting confessions
app.post('/confession', async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).send('Confession text is required.');
        }
        const confession = new Confession({ text: req.body.text });
        await confession.save();
        res.send('Confession posted successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving confession.');
    }
});

// Route to get all confessions
app.get('/confessions', async (req, res) => {
    try {
        const confessions = await Confession.find().sort({ createdAt: -1 }); // Latest confessions first
        res.json(confessions);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving confessions.');
    }
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handling for Multer errors (e.g., file filter issues)
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).send('File upload error.');
    } else if (err) {
        return res.status(400).send(err.message);
    }
    next();
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
