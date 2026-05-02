const db = require("../db");
const bcrypt = require('bcrypt');

const placeOrder = async (req, res) => {
  try {
    const { customer_name, phone, address, payment_method, email, is_guest } = req.body;

    // Get cart items
    const [cartItems] = await db.query("SELECT * FROM cart");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total_price = cartItems.reduce(
      (sum, item) => sum + Number(item.product_price) * item.quantity,
      0
    );

    // If guest, create an account
    if (is_guest && email) {
        // check if email or phone already exists
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(phone, salt);
            // use email prefix as username
            const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
            await db.query(
                'INSERT INTO users (username, email, password, full_name, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
                [username, email, hashedPassword, customer_name, phone, address]
            );
        }
    }

    // Save order
    await db.query(
      `INSERT INTO orders 
      (customer_name, phone, address, payment_method, items, total_price)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        customer_name,
        phone,
        address,
        payment_method,
        JSON.stringify(cartItems),
        total_price,
      ]
    );

    // Clear cart after order
    await db.query("DELETE FROM cart");

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Place order error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { placeOrder };