CREATE TABLE order_products (
    id SERIAL PRIMARY  KEY,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    quantity integer
);
INSERT INTO order_products(order_id, product_id, quantity) VALUES (1, 1, 50);