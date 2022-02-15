CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    password VARCHAR(150)
);
INSERT INTO users(firstName, lastName, password) VALUES ('Hannes', 'Roth', 'asjd623lksfgal32');