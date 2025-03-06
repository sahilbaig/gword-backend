# Google Word as Notion -> Backend

This Express.js application handles backend integration for [GWord Frontend](https://github.com/sahilbaig/gword-frontend). It allows users to log in via Google, authenticate with JWT, and store documents in Google Drive. It also integrates MongoDB for storing drafts.

## Features

- **Google OAuth Authentication**: Log in using Google OAuth to authenticate users.
- **JWT Authentication**: Use JWT for secure user authentication and session management.
- **Google Drive Integration**: Save documents directly to the user's Google Drive.
- **MongoDB Draft Storage**: Store user drafts in MongoDB for later retrieval.

## Pages

- **Login Callback**: Handles Google OAuth callback and generates JWT for the user.
- **Dashboard**: A protected route for users to manage their documents.
- **User Info**: Fetches user information from the JWT token stored in a cookie.
- **Logout**: Logs the user out by clearing the JWT token.

## Tech Stack

- **Express.js**: Web framework for handling HTTP requests.
- **Passport.js**: Authentication middleware for Google OAuth login.
- **JWT (jsonwebtoken)**: Token-based authentication using JWTs.
- **MongoDB**: Database for storing user drafts.
- **Google Drive API**: API for saving documents directly to the user's Google Drive.
