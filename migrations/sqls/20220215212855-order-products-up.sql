CREATE TABLE order_products (
    "id" SERIAL PRIMARY  KEY,
    "orderId" bigint REFERENCES orders(id),
    "productId" bigint REFERENCES products(id),
    "quantity" integer
);
INSERT INTO order_products("orderId", "productId", "quantity") VALUES (1, 1, 50);