// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME || 'macbook_store',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// // GET orders by user ID
// router.get('/user/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const [rows] = await pool.query(
//             'SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC',
//             [userId]
//         );
//         res.json(rows);
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({ message: 'Server error fetching orders' });
//     }
// });

// // POST a new order (optional, for testing)
// router.post('/', async (req, res) => {
//     try {
//         const { user_id, product_name, price_string, status, image_url } = req.body;
//         const [result] = await pool.query(
//             'INSERT INTO orders (user_id, product_name, price_string, status, image_url) VALUES (?, ?, ?, ?, ?)',
//             [user_id, product_name, price_string, status || 'Delivering', image_url]
//         );
//         res.status(201).json({ id: result.insertId, message: 'Order created successfully' });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ message: 'Server error creating order' });
//     }
// });

// module.exports = router;
