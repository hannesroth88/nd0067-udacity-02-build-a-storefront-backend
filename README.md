# Storefront Backend Project

## Introduction
This repo is a project for Udacity Nanodegree Fullstack Javascript Developer
It contains a basic Node and Express app with Postgres Database

# Getting Started

## Nodejs
npm install

## Database
1. install docker
2. `npm run db` or `run docker compose up` to start the database. The database runs on port:5433
3. `db-migrate db:create full_stack_test` creates the test database
4. `db-migrate db:create full_stack_dev` creates the dev database

Database can be resetted with: `db-migrate reset`

Database can be initialized with: `db-migrate up`

# Testing
Start the database

just run `npm run test` to start the test.

Database will be resetted in the beginning and some test rows inserted. After all tests tables are dropped again 

# Start Script
## How to start
Start the database

The Application can be used.
Base url is `http://localhost:8080`

Endpoints are listed under REQUIREMENTS.md

## Admin User
As creating users need a valid JWT Token, you are provided with the following start admin user.
- UserId:1
- Password:1234


# .env File
put the following into an .env file:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5433
POSTGRES_DB=full_stack_dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=fenster1234

POSTGRES_HOST_TEST=127.0.0.1
POSTGRES_PORT_TEST=5433
POSTGRES_DB_TEST=full_stack_test
POSTGRES_USER_TEST=postgres
POSTGRES_PASSWORD_TEST=fenster1234

NODE_ENV=dev
BCRYPT_PASSWORD=somePassword
SALT_ROUNDS=10
PEPPER=ADDABITP3PP3r
TOKEN_SECRET=ThESecReTTokEn
```
