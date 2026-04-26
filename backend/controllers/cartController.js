const db = require("../db");

// GET all cart items
const getCartItems = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM cart ORDER BY created_at DESC");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST add item to cart
const addToCart = async (req, res) => {
  try {
    console.log("POST /api/cart hit");
    console.log(req.body);

    const { product_id, product_name, product_price, product_image } = req.body;

    const [existing] = await db.query(
      "SELECT * FROM cart WHERE product_id = ?",
      [product_id]
    );

    if (existing.length > 0) {
      await db.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE product_id = ?",
        [product_id]
      );

      return res.status(200).json({ message: "Quantity updated" });
    }

    await db.query(
      `INSERT INTO cart (product_id, product_name, product_price, product_image, quantity)
       VALUES (?, ?, ?, ?, 1)`,
      [product_id, product_name, product_price, product_image]
    );

    res.status(201).json({ message: "Item added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: err.message });
  }
};

// PUT update quantity
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    await db.query("UPDATE cart SET quantity = ? WHERE id = ?", [quantity, id]);

    res.status(200).json({ message: "Cart updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE remove item
const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM cart WHERE id = ?", [id]);

    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
};