import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the Authorization header or cookie
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    // Send a 401 response and end the function
    res.status(401).json({ message: "No token provided" });
    return; // End the function here
  }

  // Verify the token
  jwt.verify(
    token,
    process.env.JWT_SECRET || "fallback_secret",
    (err: any, user: any) => {
      if (err) {
        // Send a 403 response and end the function
        res.status(403).json({ message: "Invalid or expired token" });
        return; // End the function here
      }

      // Attach the user payload to the request object
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    }
  );
};
