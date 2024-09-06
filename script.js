const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Picture upload route
app.post('/upload-picture', upload.single('picture'), (req, res) => {
    res.send('Picture uploaded successfully');
});

// Confession routes
app.post('/confession', (req, res) => {
    // Handle confession saving logic here
    res.send('Confession posted successfully');
});

app.get('/confessions', (req, res) => {
    // Send list of confessions here
    res.json([]);
});

// Serve static files (like your HTML, CSS, and client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Server running on port 3000'));
