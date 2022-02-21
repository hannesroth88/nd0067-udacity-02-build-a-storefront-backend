# Storefront Backend Project

## Introduction
This repo is a project for Udacity Nanodegree Fullstack Javascript Developer
It contains a basic Node and Express app with Postgres Database

# Getting Started

## Nodejs
npm install

## Database
1. install docker
2. `npm run db` or `run docker compose up` to start the database
   
Database runs on port:5433

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
Base url is localhost:8080

Endpoints are listed under REQUIREMENTS.md

## Admin User
As creating users need a valid JWT Token, you are provided with the following start admin user.
- UserId:1
- Password:1234