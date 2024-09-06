const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/education-hub', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const confessionSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
});

const Confession = mongoose.model('Confession', confessionSchema);

// Middleware
app.use(express.static('public'));
app.use(express.json()); // For parsing application/json

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Route for uploading pictures
app.post('/upload-picture', upload.single('picture'), (req, res) => {
    res.send('Picture uploaded successfully.');
});

// Route for posting confessions
app.post('/confession', async (req, res) => {
    const confession = new Confession({ text: req.body.text });
    await confession.save();
    res.send('Confession posted successfully.');
});

// Get all confessions
app.get('/confessions', async (req, res) => {
    const confessions = await Confession.find();
    res.json(confessions);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
