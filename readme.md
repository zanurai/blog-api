# Documentation

## Tech stack

1. node
2. Express
3. Typescript

## Installation

1. Install dependencies `npm install`
1. Create a `.env` file in the main folder of your project. Copy the settings from .env.example into it and replace any example values with your real ones

```
CONNECTION_STRING=mongodb://0.0.0.0:27017/nextauth
PORT=5000
JWT_SECRET=supersecretkey
```

4. Run project with `npm start`

## Folder Structure

1. src - The main directory that contains all application code, config,controllers,middleware, models, routes, uploads, utils.

2. config - The config folder contains db file for the app. One of these files is used to connect to MongoDB, using a connection string stored in the .env file to ensure secure and efficient database access.

3. controllers - The controllers folder contains two files: one for handling user-related operations and another for blog-related actions. The user controller manages tasks like creating, updating, and fetching user data, while the blog controller handles operations such as creating, retrieving, updating, and deleting blog posts. Each controller interacts with the database and responds with the appropriate result, ensuring the proper functioning of the application’s API

4. middleware - The middleware folder has two files: auth and error handling. The auth middleware checks for a valid JWT token, ensuring secure access. The error handling middleware manages 404 errors for unknown routes and handles general errors, returning appropriate status codes and messages. These middlewares control access and handle errors effectively

5. models - The models folder contains two files: user and blog. The user model defines the schema for user data, including fields like username, email, and password. The blog model defines the schema for blog posts, with fields like title, description, and the deletion status. Both schemas ensure that the data stored in the database follows a structured format and validation rules

6. routes -The routes folder contains blog-route and user-route files. blog-route handles blog-related endpoints, while user-route manages user-related endpoints, connecting the client to the backend for CRUD operations.

7. utils -The utils folder contains a file called generateToken, which is responsible for generating JWT tokens. This function creates a secure token that can be used for user authentication and authorization in the application.

8. uploads - The uploads folder stores image files uploaded by users, ensuring only supported formats (JPEG, JPG, PNG) are accepted 

app - The app in the backend sets up the server using Express. It handles data parsing, manages CORS, serves static files like images, and defines routes for users and blogs. It also includes error handling middleware and starts the server on a specified port to respond to client requests.
