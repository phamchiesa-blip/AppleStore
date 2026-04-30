const db = require("../db");

const placeOrder = async (req, res) => {
    try {
        const { customer_name, phone, address, payment_method } = req.body;

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

        // Save order
        await db.query(
            `INSERT INTO orders 
      (customer_name, phone, address, payment_method, items, total_price, status)
      VALUES (?, ?, ?, ?, ?, ?, 'Pending')`,
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

const getAllOrders = async (req, res) => {
  try {
    const [orders] = await db.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
    res.json({ success: true, message: "Order status updated" });
  } catch (err) {
    console.error("Update order error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const [orders] = await db.query("SELECT * FROM orders WHERE customer_name = ? ORDER BY created_at DESC", [req.user.username]);
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Get my orders error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { placeOrder, getAllOrders, updateOrderStatus, getMyOrders };
