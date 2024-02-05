# E-Commerce REST API

This repository contains a Node.js-based REST API for an e-commerce system, providing endpoints for product management, including CRUD operations and search functionality.

## Features

1. *CRUD Operations:*
   - Create, Read, Update, and Delete operations for products.
   - Products can have multiple variants, each with a name, SKU, additional cost, and stock count.

2. *Search Functionality:*
   - An endpoint for searching products by product name, description, or variant name.

3. *Test Driven Development (TDD):*
   - Unit and integration tests to ensure correct functionality and data handling.

## Project Structure

- *Controllers:* Handle request handling and business logic.
- *Routes:* Define API routes and connect them to controllers.
- *Models:* Define data models for MongoDB.

## How to Run

1. Clone the repository.
2. Install dependencies with npm install.
3. Configure MongoDB connection in app.js.
4. Run the application with npm start.

## API Endpoints

- *Create Product:* POST /api/products
- *Read All Products:* GET /api/products
- *Read Product by ID:* GET /api/products/:id
- *Update Product by ID:* PUT /api/products/:id
- *Delete Product by ID:* DELETE /api/products/:id
- *Search Products:* GET /api/products/search?query=<search_term>

## Testing

- Run tests with npm test.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Jest for testing

## Author
dhananjay kiran