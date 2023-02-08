-- Active: 1673989044876@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL 
);

PRAGMA table_info ('users');

INSERT INTO users (id, email, password)
VALUES 
('u001', 'geovanna@email.com', 'geovanna27'),
('u002', 'guilherme@email.com', 'guilherme27'),
('u003', 'sampaio@email.com', 'sampaio27');

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (id, name, price, description, image_url)
VALUES
('p001', 'Mouse', 100.90, 'Mouse gamer Razer 16000 DPI', 'https://picsum.photos/200'),
('p002', 'Teclado', 270.90, 'Teclado gamer Redragon Switch Blue', 'https://picsum.photos/200'),
('p003', 'Headset', 370.90, 'Headset gamer Redragon Zeus, Surround 7.1, USB, Drivers 53MM', 'https://picsum.photos/200'),
('p004', 'CS:GO', 25.90, 'Jogo de FPS, steam key', 'https://picsum.photos/200'),
('p005', 'Camisa The Last Of US', 70.40, 'Camisa jogo The Last Of Us, tecido de algodão', 'https://picsum.photos/200');

SELECT * FROM products -- Procurar por nome
WHERE name = 'Mouse';

INSERT INTO users (id, email, password)
VALUES 
    ('u004', 'oliveira@email.com', 'oliveira2003');


SELECT * FROM products -- procurar por id
WHERE id = 'p002';

DELETE FROM users -- Delete user por id
WHERE id = 'u004';
DELETE FROM products -- Delete user por id
WHERE id = 'p006';

UPDATE products
SET name = 'Camisa The Last Of US 2'
WHERE id = 'p005';
UPDATE users
SET email = 'ampaio324@email.com'
WHERE id = 'u003';

SELECT * FROM users -- Email ordem crescente 
ORDER BY email ASC;

SELECT * FROM products  -- preço ordem crescente
ORDER BY price ASC;

SELECT * FROM products
WHERE price >= 70 AND price <= 300
ORDER BY price ASC;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
    paid INTEGER NOT NULL
);

SELECT * FROM purchases;

INSERT INTO purchases (id, buyer_id, total_price, paid)
VALUES
    ('pu001', 'u001', 88.50, true),
    ('pu002', 'u001', 100.44, true),
    ('pu003', 'u002', 50.60, true),
    ('pu004', 'u002', 40.70, true),
    ('pu005', 'u003', 250.50, true),
    ('pu006', 'u003', 300.00, true);

    
DROP TABLE purchases;

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NUll,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL
);

SELECT * FROM purchases_products;

DROP TABLE purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ('pu001', 'p004', 5),
    ('pu002', 'p005', 2),
    ('pu003', 'p002', 1);

SELECT * FROM purchases_products
INNER JOIN purchases 
WHERE purchases_products.purchase_id = purchases.id;

DROP TABLE products;
DROP TABLE users;
DROP TABLE purchases;

DROP TABLE purchases_products;