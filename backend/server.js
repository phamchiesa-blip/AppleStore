const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ipad', require('./routes/ipad'));
app.use('/api/users', require('./routes/user'));
// app.use('/api/orders', require('./routes/order'));
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", require('./routes/product'));

  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
