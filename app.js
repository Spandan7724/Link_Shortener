const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/linkShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Link Schema
const linkSchema = new mongoose.Schema({
    originalLink: String,
    shortLink: String,
});

const Link = mongoose.model('Link', linkSchema);

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/shorten', async (req, res) => {
    const { originalLink } = req.body;
    const shortLink = shortid.generate();

    try {
        const newLink = new Link({ originalLink, shortLink });
        await newLink.save();
        res.json({ shortenedLink: `${req.headers.origin}/${shortLink}` });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/:shortLink', async (req, res) => {
    const { shortLink } = req.params;
    const link = await Link.findOne({ shortLink });

    if (link) {
        res.redirect(link.originalLink);
    } else {
        res.status(404).send('Link not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

