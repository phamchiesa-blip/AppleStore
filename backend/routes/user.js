const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'macbook_store',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// GET user profile
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, username, email, full_name, phone, address, created_at FROM users WHERE id = ?', 
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error fetching user profile' });
    }
});

// PUT update user profile
router.put('/:id', async (req, res) => {
    try {
        const { full_name, phone, address } = req.body;
        await pool.query(
            'UPDATE users SET full_name = ?, phone = ?, address = ? WHERE id = ?',
            [full_name || null, phone || null, address || null, req.params.id]
        );
        
        // Return back the updated user
        const [rows] = await pool.query(
            'SELECT id, username, email, full_name, phone, address FROM users WHERE id = ?',
            [req.params.id]
        );
        res.json({ message: 'Profile updated successfully', user: rows[0] });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
});

module.exports = router;
