const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Không có token, quyền truy cập bị từ chối' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secretkey');
    req.user = decoded;
    
    // Check if the user is banned from the token (if updated)
    if (req.user.status === 'banned') {
       return res.status(403).json({ message: 'Tài khoản của bạn đã bị khoá.' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Không có quyền truy cập. Yêu cầu quyền quản trị viên.' });
  }
};

module.exports = { authMiddleware, isAdmin };
