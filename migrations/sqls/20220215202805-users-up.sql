CREATE TABLE users (
    "id" SERIAL PRIMARY  KEY,
    "firstName" VARCHAR(150),
    "lastName" VARCHAR(150),
    "password" VARCHAR(150)
);
INSERT INTO users("firstName", "lastName", "password") VALUES ('Hannes', 'Roth', '$2b$10$5sYpcJRckiAvixaXOD7jU..qOs53ub/iCXxw/GpW3RgVWHNvR6Kci');