CREATE DATABASE IF NOT EXISTS macbook_store;

USE macbook_store;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, username, email, password)
VALUES (1, 'Admin', 'admin@apple.com', '$2b$10$X8O5T9K.gC.K9l6m/v4L0.W8M.Fq8u8.F8N8B8r8Y8t.Q8s8n8e8C');

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

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price_string VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Delivering',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO orders (user_id, product_name, price_string, status, image_url)
VALUES 
(1, 'MacBook Pro 16-inch', '$2499', 'Delivered', 'https://www.apple.com/v/macbook-pro-13/p/images/overview/hero_endframe__bsza6x4fldiq_large_2x.jpg'),
(1, 'AirPods Pro', '$249', 'Delivering', 'https://www.apple.com/v/airpods-pro/h/images/overview/hero__gnfk5g59t0qe_large_2x.png');
