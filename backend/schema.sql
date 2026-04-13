-- 1. Tạo Database
CREATE DATABASE IF NOT EXISTS macbook_store;

-- 2. Chọn Database để sử dụng
USE macbook_store;

-- 3. Tạo bảng users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
