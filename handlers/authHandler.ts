import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const handleGoogleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return; // End the function here
  }

  // Generate JWT
  const token = jwt.sign(
    req.user as object,
    process.env.JWT_SECRET || "fallback_secret",
    {
      expiresIn: "1h",
    }
  );

  // Set the token in a cookie
  res.cookie("token", token, {
    httpOnly: true,
  });

  res.redirect("http://localhost:3000/dashboard");
};
