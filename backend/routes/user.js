const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, req.params.id + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


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
            'SELECT id, username, email, full_name, phone, address, avatar_url, role, status, created_at FROM users WHERE id = ?', 
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
            'SELECT id, username, email, full_name, phone, address, avatar_url, role, status FROM users WHERE id = ?',
            [req.params.id]
        );
        res.json({ message: 'Profile updated successfully', user: rows[0] });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
});

// POST upload avatar
router.post('/:id/avatar', upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const avatarUrl = '/public/uploads/' + req.file.filename;
        await pool.query('UPDATE users SET avatar_url = ? WHERE id = ?', [avatarUrl, req.params.id]);
        res.json({ message: 'Avatar uploaded successfully', avatar_url: avatarUrl });
    } catch (error) {
        console.error('Error uploading avatar:', error);
        res.status(500).json({ message: 'Server error uploading avatar' });
    }
});

// DELETE avatar
router.delete('/:id/avatar', async (req, res) => {
    try {
        await pool.query('UPDATE users SET avatar_url = NULL WHERE id = ?', [req.params.id]);
        res.json({ message: 'Avatar deleted successfully' });
    } catch (error) {
        console.error('Error deleting avatar:', error);
        res.status(500).json({ message: 'Server error deleting avatar' });
    }
});

module.exports = router;
