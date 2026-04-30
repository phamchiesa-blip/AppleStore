const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders, updateOrderStatus, getMyOrders } = require("../controllers/orderController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", placeOrder);
router.get("/my-orders", verifyToken, getMyOrders);
router.get("/", verifyAdmin, getAllOrders);
router.put("/:id/status", verifyAdmin, updateOrderStatus);

module.exports = router;