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