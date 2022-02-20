CREATE TABLE orders (
    "id" SERIAL PRIMARY  KEY,
    "userId" bigint REFERENCES users(id),
    "status" VARCHAR(150)
);
INSERT INTO orders("userId", "status") VALUES(1, 'active');
INSERT INTO orders("userId", "status") VALUES(1, 'complete');