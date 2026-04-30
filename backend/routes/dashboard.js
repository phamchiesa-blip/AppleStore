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

// GET /api/dashboard/stats (Admin only)
router.get('/stats', verifyAdmin, async (req, res) => {
    try {
        const [usersResult] = await pool.query('SELECT COUNT(*) as total FROM users');
        const totalUsers = usersResult[0].total;

        const [ordersResult] = await pool.query('SELECT COUNT(*) as total, SUM(total_price) as revenue FROM orders');
        const totalOrders = ordersResult[0].total;
        const totalRevenue = ordersResult[0].revenue || 0;

        const [ipadResult] = await pool.query('SELECT COUNT(*) as total FROM ipad');
        const totalProducts = ipadResult[0].total;

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalOrders,
                totalRevenue: parseFloat(totalRevenue),
                totalProducts
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ success: false, message: 'Server error fetching stats' });
    }
});

module.exports = router;
