const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/ipad
// Fetch iPads from the ipad table
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM ipad';
        const [rows] = await pool.execute(query);
        
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error fetching iPads:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching iPads' });
    }
});

module.exports = router;
