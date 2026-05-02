CREATE DATABASE IF NOT EXISTS macbook_store;
USE macbook_store;

DROP TABLE IF EXISTS users, products, cart, orders, ipad;


-- ==========================================
-- USERS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    address TEXT DEFAULT NULL,
    role VARCHAR(50) DEFAULT 'user',
    status VARCHAR(50) DEFAULT 'active',
    avatar_url VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default Users (Passwords are 'admin123' and 'user123')
INSERT IGNORE INTO users (username, email, password, full_name, role, status)
VALUES 
('admin', 'admin@applestore.com', '$2b$10$oL5oBrGV96wft2IlRRQO0.Nr5LEsGKdNUfBp9P8HqgFReT3.lEfae', 'Administrator', 'admin', 'active'),
('user', 'user@applestore.com', '$2b$10$oL5oBrGV96wft2IlRRQO0.Ll1AwYTSp/4EyHgiemh8n4k4jgEl3pG', 'Normal User', 'user', 'active');

-- Test Users requested by client
INSERT IGNORE INTO users (username, email, password, full_name, role, status, avatar_url)
VALUES 
('user_no_avatar', 'noavatar@applestore.com', '$2b$10$oL5oBrGV96wft2IlRRQO0.Ll1AwYTSp/4EyHgiemh8n4k4jgEl3pG', 'User Without Avatar', 'user', 'active', NULL),
('user_with_avatar', 'withavatar@applestore.com', '$2b$10$oL5oBrGV96wft2IlRRQO0.Ll1AwYTSp/4EyHgiemh8n4k4jgEl3pG', 'User With Avatar', 'user', 'active', 'D:\\study\\hanu\\fit\\nam 3.2\\iws\\final\\finalClone0105\\42725836-adf9-4fc7-8764-9f671109ee3a-1624678195-502-width600height400.webp');


-- ==========================================
-- PRODUCTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    options JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert iPads
INSERT IGNORE INTO products (id, category, name, description, base_price, image_url, options) VALUES 
(1, 'ipad', 'iPad Pro', 'The ultimate iPad experience with the most advanced technology.', 999.00, '/ipadprom4.png', '{"models":["11-inch","13-inch"],"colors":["Silver","Space Black"],"storages":[{"capacity":"256GB","price_modifier":0},{"capacity":"512GB","price_modifier":200},{"capacity":"1TB","price_modifier":600},{"capacity":"2TB","price_modifier":1000}]}'),
(2, 'ipad', 'iPad Air', 'Serious performance in a thin and light design.', 599.00, '/ipadair.png', '{"models":["11-inch","13-inch"],"colors":["Space Gray","Starlight","Purple","Blue"],"storages":[{"capacity":"64GB","price_modifier":0},{"capacity":"256GB","price_modifier":150}]}'),
(3, 'ipad', 'iPad', 'The colorful, all-screen iPad for everyday things.', 349.00, '/ipadnormal.png', '{"models":["10.9-inch"],"colors":["Silver","Blue","Pink","Yellow"],"storages":[{"capacity":"64GB","price_modifier":0},{"capacity":"256GB","price_modifier":150}]}'),
(4, 'ipad', 'iPad mini', 'The full iPad experience designed to fit in one hand.', 499.00, '/ipadmini.png', '{"models":["8.3-inch"],"colors":["Space Gray","Pink","Purple","Starlight"],"storages":[{"capacity":"64GB","price_modifier":0},{"capacity":"256GB","price_modifier":150}]}');

-- Insert Macs
INSERT IGNORE INTO products (id, category, name, description, base_price, image_url, options) VALUES 
(5, 'mac', 'MacBook Neo', 'A new era of Mac.', 599.00, 'https://imagor.owtg.one/unsafe/fit-in/800x800/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2026/3/5/macbook-neo-13-inch-8gb-256gb-o16.png', '{"models":["Standard"],"colors":["Silver","Blush","Citrus","Indigo"],"storages":[{"capacity":"256GB","price_modifier":0},{"capacity":"512GB","price_modifier":200}]}'),
(6, 'mac', 'MacBook Air', 'Supercharged by M3.', 1099.00, 'https://cdn.tgdd.vn/Products/Images/44/335375/s16/macbook-air-15-inch-m4-thumb-bac-650x650.png', '{"models":["13-inch","15-inch"],"colors":["Sky Blue","Silver","Starlight","Midnight"],"storages":[{"capacity":"256GB","price_modifier":0},{"capacity":"512GB","price_modifier":200},{"capacity":"1TB","price_modifier":400},{"capacity":"2TB","price_modifier":800}]}'),
(7, 'mac', 'MacBook Pro', 'Mind-blowing. Head-turning.', 1699.00, 'https://macone.vn/wp-content/uploads/2025/09/mbp16-spaceblack.png', '{"models":["14-inch","16-inch"],"colors":["Space Black","Silver"],"storages":[{"capacity":"1TB","price_modifier":0},{"capacity":"2TB","price_modifier":400}]}'),
(8, 'mac', 'iMac', 'Packed with M4 power.', 1299.00, 'https://bizweb.dktcdn.net/thumb/large/100/444/581/products/1-507bff5e-68c1-4fdc-968c-ce96ca0a8ba0.png?v=1743742041397', '{"models":["M4 with two ports","M4 with four ports"],"colors":["Blue","Green","Pink","Silver","Yellow","Orange","Purple"],"storages":[{"capacity":"256GB","price_modifier":0},{"capacity":"512GB","price_modifier":200},{"capacity":"1TB","price_modifier":400},{"capacity":"2TB","price_modifier":800}]}'),
(9, 'mac', 'Mac mini', 'More muscle. More hustle.', 599.00, 'https://www.macmall.vn/uploads/mac-mini-m4-macmall_1730571867.vn.png', '{"models":["M4 chip","M4 Pro chip"],"colors":["Space Black","Silver"],"storages":[{"capacity":"256GB","price_modifier":0},{"capacity":"512GB","price_modifier":200},{"capacity":"1TB","price_modifier":400},{"capacity":"2TB","price_modifier":800},{"capacity":"4TB","price_modifier":1400}]}');

-- Insert iPhones
INSERT IGNORE INTO products (id, category, name, description, base_price, image_url, options) VALUES 
(10, 'iphone', 'iPhone 16', 'Built for Apple Intelligence.', 699.00, 'https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-16-plus-ultramarine?wid=400&hei=400&fmt=webp-alpha', '{"models":["16 Plus","16 Pro","16 Pro Max"],"colors":["Black","White","Pink","Teal","Ultramarine"],"storages":[{"capacity":"128GB","price_modifier":0},{"capacity":"256GB","price_modifier":100}]}'),
(11, 'iphone', 'iPhone 17', 'The next generation.', 599.00, 'https://cdn.tgdd.vn/Products/Images/42/342679/s16/iphone-17-pro-max-cam-thumb-650x650.png', '{"models":["17","17e","17 Pro","17 Pro Max"],"colors":["Black","White","Titanium","Gold","Blue","Green","Red"],"storages":[{"capacity":"256GB","price_modifier":0},{"capacity":"512GB","price_modifier":200},{"capacity":"1TB","price_modifier":400},{"capacity":"2TB","price_modifier":800}]}'),
(12, 'iphone', 'iPhone Air', 'Impossibly thin.', 999.00, 'https://24hstore.vn/images/products/2025/09/10/original/iphone-air-xanh-troi-01.png', '{"models":["Standard"],"colors":["Silver","Space Gray","Gold","Rose Gold"],"storages":[{"capacity":"256GB","price_modifier":0},{"capacity":"512GB","price_modifier":200},{"capacity":"1TB","price_modifier":400}]}');

-- Insert AirPods
INSERT IGNORE INTO products (id, category, name, description, base_price, image_url, options) VALUES 
(13, 'airpods', 'AirPods', 'Iconic design. Incredible sound.', 129.00, '/airpods.png', '{"models":["AirPods 3","AirPods 4","AirPods 4 with ANC"],"colors":["White"],"storages":[]}'),
(14, 'airpods', 'AirPods Pro', 'Magic like you''ve never heard.', 199.00, '/airpodspro.png', '{"models":["AirPods Pro","AirPods Pro 2","AirPods Pro 3"],"colors":["White"],"storages":[]}'),
(15, 'airpods', 'AirPods Max', 'Over-ear audio reinvented.', 449.00, '/airpodsmax.png', '{"models":["AirPods Max","AirPods Max 2"],"colors":["Space Gray","Silver","Green","Sky Blue","Pink"],"storages":[]}');

-- Insert Watches
INSERT IGNORE INTO products (id, category, name, description, base_price, image_url, options) VALUES 
(16, 'watch', 'Apple Watch Series 11', 'The ultimate device for a healthy life.', 399.00, '/watch11.png', '{"models":["Aluminum","Titanium"],"colors":["Standard"],"storages":[{"capacity":"42mm","price_modifier":0},{"capacity":"46mm","price_modifier":30}],"bands":["Rubber","Textile","Stainless Steel"]}'),
(17, 'watch', 'Apple Watch SE 3', 'A great deal to love.', 249.00, '/watchse.png', '{"models":["Standard"],"colors":["Midnight","Starlight"],"storages":[{"capacity":"40mm","price_modifier":0},{"capacity":"44mm","price_modifier":30}],"bands":["Rubber","Textile","Stainless Steel"]}'),
(18, 'watch', 'Apple Watch Ultra 3', 'Adventure awaits.', 799.00, '/watchultra.png', '{"models":["Standard"],"colors":["Natural Titanium","Black Titanium"],"storages":[{"capacity":"Standard","price_modifier":0}],"bands":["Alpine Loop","Trail Loop","Ocean Band","Titanium Milanese Loop"]}');

-- Insert TV & Home
INSERT IGNORE INTO products (id, category, name, description, base_price, image_url, options) VALUES 
(19, 'tvhome', 'Apple TV 4K', 'The Apple experience. Cinematic in every sense.', 149.00, '/appletv.png', '{"models":["Wi-Fi","Wi-Fi + Ethernet"],"colors":["Black"],"storages":[]}');


-- ==========================================
-- CART TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    product_image TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- ORDERS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    items JSON NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
