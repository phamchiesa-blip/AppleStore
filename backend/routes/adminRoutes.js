const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'macbook_store',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Protect all admin routes
router.use(authMiddleware, isAdmin);

// ================= USERS MANAGEMENT =================

// GET all users
router.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, username, email, full_name, phone, address, role, status, created_at FROM users ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error fetching users' });
    }
});

// PUT update user status (ban/unban)
router.put('/users/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'banned'].includes(status)) {
            return res.status(400).json({ message: 'Status không hợp lệ' });
        }
        
        // Ngăn admin tự khoá chính mình
        if (parseInt(req.params.id) === req.user.id) {
             return res.status(400).json({ message: 'Không thể tự thay đổi trạng thái của chính mình' });
        }

        await pool.query(
            'UPDATE users SET status = ? WHERE id = ?',
            [status, req.params.id]
        );
        res.json({ message: `User status updated to ${status}` });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Server error updating user status' });
    }
});

// ================= ORDERS MANAGEMENT =================

// GET all orders
router.get('/orders', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error fetching orders' });
    }
});

// ================= PRODUCTS (IPAD) MANAGEMENT =================

// GET all iPads
router.get('/ipad', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ipad ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching ipads:', error);
        res.status(500).json({ message: 'Server error fetching products' });
    }
});

// POST add new iPad
router.post('/ipad', async (req, res) => {
    try {
        const { category, name, description, price_string, accent_color, image_url, long_description } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO ipad (category, name, description, price_string, accent_color, image_url, long_description) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [category || 'ipad', name, description, price_string, accent_color, image_url, long_description]
        );
        res.status(201).json({ message: 'Product added successfully', id: result.insertId });
    } catch (error) {
        console.error('Error adding ipad:', error);
        res.status(500).json({ message: 'Server error adding product' });
    }
});

// PUT edit iPad
router.put('/ipad/:id', async (req, res) => {
    try {
        const { category, name, description, price_string, accent_color, image_url, long_description } = req.body;
        
        await pool.query(
            'UPDATE ipad SET category=?, name=?, description=?, price_string=?, accent_color=?, image_url=?, long_description=? WHERE id=?',
            [category || 'ipad', name, description, price_string, accent_color, image_url, long_description, req.params.id]
        );
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating ipad:', error);
        res.status(500).json({ message: 'Server error updating product' });
    }
});

// DELETE iPad
router.delete('/ipad/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM ipad WHERE id=?', [req.params.id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting ipad:', error);
        res.status(500).json({ message: 'Server error deleting product' });
    }
});

module.exports = router;
