CREATE TABLE products (
    id SERIAL PRIMARY  KEY,
    name VARCHAR(150),
    price real
);
INSERT INTO products(name, price) VALUES('SmartMeter', 1337.2);