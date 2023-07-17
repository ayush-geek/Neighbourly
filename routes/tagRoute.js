const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');

// Route to get all available tags
router.get('/', async (req, res) => {
    try {
        const tags = await Blog.distinct('tag');
        res.json(tags);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ error: 'Failed to fetch tags.' });
    }
});

module.exports = router;