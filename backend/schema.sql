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

CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    product_image TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM cart;

drop table orders;
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    items JSON NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE orders;
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    items JSON NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE orders;
SET SQL_SAFE_UPDATES = 0;
delete from ipad;

INSERT INTO ipad (category, name, description, price_string, accent_color)
VALUES 
('ipad', 'iPad Pro', 'The ultimate iPad experience with the most advanced technology.', 'From $999', 'from-blue-500 to-purple-600'),
('ipad', 'iPad Air', 'Serious performance in a thin and light design.', 'From $599', 'from-blue-400 to-teal-400'),
('ipad', 'iPad', 'The colorful, all-screen iPad for everyday things.', 'From $349', 'from-yellow-400 to-pink-500'),
('ipad', 'iPad mini', 'The full iPad experience designed to fit in one hand.', 'From $499', 'from-purple-400 to-indigo-500');
SELECT * FROM ipad;

-- thêm url ảnh vô ipad:
ALTER TABLE ipad ADD COLUMN image_url VARCHAR(255); 
UPDATE ipad SET image_url = '/ipadprom4.png' WHERE name = 'iPad Pro';
UPDATE ipad SET image_url = '/ipadair.png' WHERE name = 'iPad Air';
UPDATE ipad SET image_url = '/ipadnormal.png' WHERE name = 'iPad';
UPDATE ipad SET image_url = '/ipadmini.png' WHERE name = 'iPad mini';

-- thêm nội dung cho từng loại ipad:
ALTER TABLE ipad ADD COLUMN long_description TEXT;
UPDATE ipad SET long_description = "M5 chip.
Furiously fast. The next giant leap for AI on iPad.
iPadOS 26. Powerfully redesigned.
Game-changing capabilities.
Do more with Apple Intelligence.
Ultra Retina XDR. The world’s most advanced display. Extreme brightness and precise contrast.
Sleek, lightweight design for ultimate portability and versatility.
" WHERE name = 'iPad Pro';
UPDATE ipad SET long_description = "M4 powers incredible performance, and advanced graphics with hardware-accelerated ray tracing. Built for Apple Intelligence.
iPadOS and amazing apps let you get things done in magical, intuitive ways. 
Apple Intelligence. Create, communicate, and get things done effAvailable in 11‑inch and 13‑inch models. Both with a stunning Liquid Retina displayortlessly.
" WHERE name = 'iPad Air';
UPDATE ipad SET long_description = "Various colors and storage. 
Connectivity. 
Apple Pencil. 
Keyboard, get an amazing typing experience and durable protection.
" WHERE name = 'iPad';
UPDATE ipad SET long_description = "
iPad mini has everything there is to love about iPad in a delightfully light, compact design. 
It features a 100 percent recycled aluminum enclosure and stunning all‑screen design, and it goes anywhere you go — fitting perfectly into a backpack or purse.
" WHERE name = 'iPad mini';

select * from ipad;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    role ENUM('admin', 'user') DEFAULT 'user',
    status ENUM('active', 'banned') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO `users` VALUES (1,'admin','admin@applestore.com','$2b$10$dM77nLBDExIg/NoHYCPKT.5419B9jwvCqb3UUPrnZN..d9AMsVVRG',NULL,NULL,NULL,'admin','active','2026-04-30 06:13:48'),(2,'user','user@applestore.com','$2b$10$XMbLAbN1AFiX7uZ/nRiTDuDPhEKAU1fFTELWnZy15ORynJ7t.Uk9C',NULL,NULL,NULL,'user','active','2026-04-30 06:19:11'),(3,'phamchuyen','bangbong2232@gmail.com','$2b$10$RuHSrIk.ubiaHaju/frBouaeBv5WBXrp657neUahDRki4cjsw.CRq',NULL,NULL,NULL,'user','active','2026-04-30 06:20:49');
