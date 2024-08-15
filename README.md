# Authentication System

## Overview

The **Authentication System** is a Node.js application designed for managing user authentication, including registration, login, logout, and profile retrieval. This system leverages JWT (JSON Web Token) for authentication and session management and employs various security practices to ensure the integrity and confidentiality of user data.

## Features

- **User Registration**: Allows users to register with their name, email, and password.
- **User Login**: Authenticates users and issues a JWT token.
- **User Logout**: Terminates the user session by invalidating the JWT token.
- **Profile Retrieval**: Fetches the profile data of the authenticated user.

## User Roles

### User

- **Permissions**:
  - Register a new account.
  - Login and retrieve a JWT token.
  - Logout to invalidate the session token.
  - Retrieve their own profile information.
  
### Admin

- **Permissions**:
  - Can only be added directly to the database.
  - Can access the profile retrieval endpoint, similar to a regular user, but has elevated permissions for additional routes if needed in the future.

## Technologies Used

- **Node.js**: JavaScript runtime for executing server-side code.
- **Express**: Web framework for building the API.
- **JWT**: For secure authentication.
- **Sequelize**: ORM for database management.
- **MySQL2**: MySQL database driver.
- **bcryptjs**: Library for hashing passwords.
- **Validatorjs**: For validating user input.
- **Helmet**: Security middleware for HTTP headers.
- **dotenv**: For managing environment variables.
- **Multer**: Middleware for handling multipart/form-data.
- **Sharp**: Image processing library.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://nhvavadiya@github.com/nhvavadiya/authentication_task_BE.git
    cd authentication_system
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and configure the following variables:

    ```
    JWT_SECRET=your_jwt_secret
    JWT_TOKEN_EXPIRY=10m
    BCRYPT_SALT=10
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    ```

4. **Run the application**:

    For production:
    ```bash
    npm start
    ```

    For development with hot reloading:
    ```bash
    npm run start:dev
    ```