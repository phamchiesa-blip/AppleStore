CREATE DATABASE IF NOT EXISTS macbook_store;

USE macbook_store;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ipad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price_string VARCHAR(50),
    accent_color VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ipad (category, name, description, price_string, accent_color)
VALUES 
('ipad', 'iPad Pro', 'The ultimate iPad experience with the most advanced technology.', 'From $999', 'from-blue-500 to-purple-600'),
('ipad', 'iPad Air', 'Serious performance in a thin and light design.', 'From $599', 'from-blue-400 to-teal-400'),
('ipad', 'iPad', 'The colorful, all-screen iPad for everyday things.', 'From $349', 'from-yellow-400 to-pink-500'),
('ipad', 'iPad mini', 'The full iPad experience designed to fit in one hand.', 'From $499', 'from-purple-400 to-indigo-500');
