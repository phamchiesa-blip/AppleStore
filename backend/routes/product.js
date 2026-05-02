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

// GET all products
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT *, CONCAT('From $', FORMAT(base_price, 0)) AS price_string FROM products ORDER BY id ASC"
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error fetching products' });
    }
});

// GET products by category (case-insensitive)
router.get('/category/:category', async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT *, CONCAT('From $', FORMAT(base_price, 0)) AS price_string FROM products WHERE LOWER(category) = LOWER(?) ORDER BY id ASC",
            [req.params.category]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Server error fetching products' });
    }
});

module.exports = router;
