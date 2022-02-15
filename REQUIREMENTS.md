# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
|REST|Route|Token required|
|-------|---|---|
|Index|products [GET]||
|Show|products/:id [GET]||
|Create|products [POST]|yes|
|[OPTIONAL] Top 5 most popular products| products/top5 [GET]|
|[OPTIONAL] Products by category|products?category=productCategory [GET]|

#### Users
|REST|Route|Token required|
|-------|---|---|
|Index|products [GET]|yes|
|Show|products/:id [GET]|yes|
|Create N|products [POST]|yes|

#### Orders
|REST|Route|Token required|
|-------|---|---|
|Current Order by user|orders?user=userId [GET]|yes|
|[OPTIONAL] Completed Orders by user|orders?user=userId&status=completed [GET]|yes|


## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


## Database Tables
#### Products
-  id : primary key
- name : varchar
- price : real

#### User
- id : primary key
- firstName : varchar
- lastName : varchar
- password : varchar

#### Orders
- id : primary key
- user_id : foreign key
- status of order (active or complete) : varchar

#### Orders-Product
- id : primary key
- order_id: foreign key
- product_id: foreign key
- quantity : integer