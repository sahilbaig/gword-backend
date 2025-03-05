# Express Authentication Server with JWT

This is an Express.js application that handles user authentication using Passport.js and JWT (JSON Web Tokens). It includes routes for logging in via Google, setting JWT tokens, and verifying user sessions.

## Features

- **Google OAuth Integration**: Authenticates users with Google and generates JWT tokens.
- **JWT Authentication**: Uses JWT to authenticate users and store the token in an httpOnly cookie.
- **User Info Endpoint**: Retrieves user information from the JWT token stored in the cookie.
- **Logout Functionality**: Clears the JWT token from the cookie to log the user out.

## Pages

- **Login Callback**: Handles the Google OAuth callback, generates JWT, and redirects to the dashboard.
- **Dashboard**: A protected route where users can access dashboard information after authentication.
- **User Info**: Fetches user information from the JWT stored in the cookie.
- **Logout**: Logs the user out by clearing the JWT cookie.

## Tech Stack

- **Express.js**: Web framework for handling HTTP requests.
- **Passport.js**: Authentication middleware for handling Google OAuth login.
- **JWT (jsonwebtoken)**: Token-based authentication using JWTs.
- **Session Management**: Uses Express-session to manage user sessions.
- **CORS**: Cross-Origin Resource Sharing setup to allow frontend requests.
- **Cookie Parser**: For parsing and handling cookies.
- **dotenv**: Loads environment variables for secure configuration.
