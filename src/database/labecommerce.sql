-- Active: 1673989044876@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
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
    category TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (id, name, price, category)
VALUES
('p001', 'Mouse', 100.90, 'Periféricos'),
('p002', 'Teclado', 270.90, 'Periféricos'),
('p003', 'Headset', 370.90, 'Periféricos'),
('p004', 'CS:GO', 25.90, 'Jogos'),
('p005', 'Camisa The Last Of US', 70.40, 'Roupas');

SELECT * FROM products -- Procurar por nome
WHERE name = 'Mouse';

INSERT INTO users (id, email, password)
VALUES 
    ('u004', 'oliveira@email.com', 'oliveira2003');

INSERT INTO products (id, name, price, category)
VALUES
('p006', 'Calça Cargo', 199.90, 'Roupas');

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
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id),
);

SELECT * FROM purchases;

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
    ('pu001', 90.50, true, DATE('now'), 'u001'),
    ('pu002', 50.30, true, NULL, 'u001'),
    ('pu003', 80.25, true, NULL, 'u002'),
    ('pu004', 80.25, true, NULL, 'u002'),
    ('pu005', 99.90, true, NULL, 'u003'),
    ('pu006', 99.90, true, NULL, 'u003');

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
WHERE purchases_products.purchase_id = purchases.id

