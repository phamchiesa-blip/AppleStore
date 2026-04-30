const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const { verifyAdmin } = require('../middleware/authMiddleware');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'macbook_store',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// GET all users (Admin only)
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, username, email, full_name, phone, address, role, status, created_at FROM users ORDER BY created_at DESC');
        res.json({ success: true, users: rows });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ success: false, message: 'Server error fetching all users' });
    }
});

// PUT update user role (Admin only)
router.put('/:id/role', verifyAdmin, async (req, res) => {
    try {
        const { role } = req.body;
        if (role !== 'admin' && role !== 'user') return res.status(400).json({ success: false, message: 'Invalid role' });
        
        await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id]);
        res.json({ success: true, message: 'User role updated successfully' });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ success: false, message: 'Server error updating user role' });
    }
});

// PUT update user status (ban/unban) (Admin only)
router.put('/:id/status', verifyAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        if (status !== 'active' && status !== 'banned') return res.status(400).json({ success: false, message: 'Invalid status' });
        
        await pool.query('UPDATE users SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ success: true, message: 'User status updated successfully' });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ success: false, message: 'Server error updating user status' });
    }
});

// GET user profile
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, username, email, full_name, phone, address, role, created_at FROM users WHERE id = ?', 
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
            'SELECT id, username, email, full_name, phone, address, role FROM users WHERE id = ?',
            [req.params.id]
        );
        res.json({ message: 'Profile updated successfully', user: rows[0] });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
});

module.exports = router;
