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

const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Fetch user phone first
        const [users] = await db.query('SELECT phone FROM users WHERE id = ?', [userId]);
        if (users.length === 0 || !users[0].phone) {
            return res.json([]);
        }
        
        const phone = users[0].phone;
        // Fetch orders by phone
        const [orders] = await db.query('SELECT * FROM orders WHERE phone = ? ORDER BY created_at DESC', [phone]);
        
        // Map order fields to what UserPage.jsx expects
        const mappedOrders = orders.map(order => {
            const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
            const firstItem = items && items.length > 0 ? items[0] : null;
            
            return {
                id: order.id,
                product_name: firstItem ? firstItem.product_name || firstItem.name : 'Order #' + order.id,
                image_url: firstItem ? firstItem.product_image || firstItem.image : null,
                status: order.status || 'Pending',
                order_date: order.created_at,
                price_string: `$${order.total_price}`,
                // Thêm các trường cho Popup Detail
                items: items,
                address: order.address,
                payment_method: order.payment_method,
                customer_name: order.customer_name,
                phone: order.phone
            };
        });
        
        res.json(mappedOrders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Server error fetching orders' });
    }
};

module.exports = { placeOrder, getUserOrders };