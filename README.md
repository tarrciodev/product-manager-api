# Product Management API

 modern, scalable API for managing products, built with Domain-Driven Design (DDD) and Clean Architecture principles. The API provides endpoints for creating, updating, deleting, and retrieving products, including a specialized endpoint for identifying products with low stock. It uses Fastify as the server framework, Mongoose for MongoDB interactions, and Swagger for API documentation. MongoDB is set up using Docker for local development with a predefined admin user and persistent storage.
Features

Product Management:
**Create a new product**
**Update existing products**
**Delete products**
**Retrieve a product by ID**
**List all products**
**Find products with low stock (e.g., countInStock < 10)**

### Architecture:
Domain-Driven Design (DDD) for clear domain modeling
Clean Architecture for separation of concerns and maintainability

### Tech Stack:
Fastify server for high-performance HTTP handling
MongoDB with Mongoose for data persistence, running via Docker
Swagger documentation accessible at /docs

Language: TypeScript
Server: Fastify
Database: MongoDB (via Docker) with Mongoose
Architecture: DDD, Clean Architecture
Documentation: Swagger
Environment: Node.js
Containerization: Docker (for MongoDB)
Package Manager: pnpm

### Prerequisites

Node.js (v18 or higher)
Docker and Docker Compose (for running MongoDB locally)
pnpm (install globally with npm install -g pnpm or use npx pnpm)
Environment variables configured (see .env.example)

### Installation

Clone the repository:
git clone https://github.com/your-username/product-management-api.git
cd product-management-api
Install dependencies:
pnpm install

Set up MongoDB with Docker:

Ensure Docker and Docker Compose are installed and running.
Use the provided docker-compose.yml to start MongoDB:version: "3.8"
services:
mongodb:
image: mongo:latest
container_name: mongodb
ports: - "27017:27017"
environment: - MONGO_INITDB_ROOT_USERNAME=admin - MONGO_INITDB_ROOT_PASSWORD=secret
volumes: - mongodb-data:/data/db
volumes:
mongodb-data:

Start the MongoDB container:docker-compose up -d

Verify MongoDB is running:docker ps

You should see a container named mongodb running on port 27017.

Set up environment variables
Create a .env file in the root directory based on .env.example:DATABASE_URL=mongodb://admin:secret@localhost:27017/user_db?authSource=admin
PORT=3333

The DATABASE_URL includes the admin username and secret password from the Docker configuration, with authSource=admin for MongoDB authentication.
For production with MongoDB Atlas, update DATABASE_URL with your Atlas connection string:DATABASE_URL=mongodb+srv://<user>:<password>@cluster0.mongodb.net/user_db?retryWrites=true&w=majority

Run the application:
pnpm start

The server will start on http://localhost:3333.

Access API documentation:

Open http://localhost:3333/docs in your browser to view the Swagger UI.
If hosted, use https://your-domain.com/docs.

### API Endpoints
The API provides the following endpoints for product management:
Method
Endpoint
Description

POST
/products
Create a new product

PUT
/products/:id
Update a product by ID

DELETE
/products/:id
Delete a product by ID

GET
/products/:id
Retrieve a product by ID
GET
/products
List all products

GET
/products/low-stock
Retrieve products with low stock

Example Request (Create Product)
curl -X POST http://localhost:3333/products \
-H "Content-Type: application/json" \
-d '{ "name": "Laptop", "price": 999.99, "category": "Electronics", "countInStock": 5, "description": "High-performance laptop", "image": "laptop.jpg" }'

Example Response
{
"id": "1234567890",
"name": "Laptop",
"price": 999.99,
"countInStock": 5,
"description": "High-performance laptop",
"image": "laptop.jpg",
}

### Running Tests
To run tests (if implemented):
pnpm test

### Deployment

Host the application on a platform like Vercel, Render, or Heroku.
Set environment variables (DATABASE_URL, PORT) in the hosting platform.
Use MongoDB Atlas for production database or host MongoDB in a containerized environment.
Access the Swagger docs at https://your-domain.com/docs.

Troubleshooting

MongoDB Connection Errors:

Verify MongoDB is running in Docker:docker ps

Check MongoDB logs:docker logs mongodb

Ensure DATABASE_URL is set to mongodb://admin:secret@localhost:27017/user_db?authSource=admin.
Test the connection using MongoDB Compass or the mongo shell:mongo "mongodb://admin:secret@localhost:27017/user_db?authSource=admin"
Add Mongoose connection debugging:mongoose.connection.on('error', (err) => console.error('Mongoose error:', err));
mongoose.connection.on('connected', () => console.log('Mongoose connected'));

Timeout Errors (e.g., products.find() buffering timed out):

Ensure Mongoose is connected before queries are executed:import mongoose from 'mongoose';
import { env } from '../../env';

export async function connectToMongoDB(): Promise<void> {
try {
await mongoose.connect(env.DATABASE_URL, {
serverSelectionTimeoutMS: 5000,
});
console.log('Connected to MongoDB via Mongoose');
} catch (error) {
console.error('Failed to connect to MongoDB:', error);
throw error;
}
}

Verify the MongoDB container is running and accessible:docker exec -it mongodb mongo -u admin -p secret --authenticationDatabase admin

### Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/new-feature).
Commit changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/new-feature).
Open a Pull Request.

### License
This project is licensed under the MIT License.








   













