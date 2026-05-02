const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Đăng ký (Sign Up)
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Kiểm tra xem email hoặc username đã tồn tại chưa
    const [existingUsers] = await db.execute(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc Email đã tồn tại' });
    }

    // Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Lưu người dùng vào CSDL
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    // Tạo token JWT để auto-login luôn
    const token = jwt.sign(
      { id: result.insertId, username: username, role: 'user', status: 'active' },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      message: 'Đăng ký thành công', 
      token: token,
      user: {
        id: result.insertId,
        username: username,
        email: email,
        full_name: null,
        phone: null,
        address: null,
        role: 'user',
        status: 'active'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Đăng nhập (Login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Tìm người dùng theo email
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const user = users[0];

    // Kiểm tra trạng thái bị khoá
    if (user.status === 'banned') {
      return res.status(403).json({ message: 'Tài khoản của bạn đã bị khoá.' });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    // Tạo token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, status: user.status },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        address: user.address,
        role: user.role,
        status: user.status
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
