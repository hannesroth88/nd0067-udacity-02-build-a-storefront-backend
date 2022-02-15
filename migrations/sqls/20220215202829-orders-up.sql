CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id bigint REFERENCES users(id),
    status VARCHAR(150)
);
INSERT INTO orders(user_id, status) VALUES(1, 'active');
INSERT INTO orders(user_id, status) VALUES(1, 'complete');