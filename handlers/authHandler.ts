import { Request, Response, NextFunction } from "express";
import passport from "passport";
export const handleGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

import jwt from "jsonwebtoken";

export const handleGoogleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Generate JWT
  const token = jwt.sign(req.user, process.env.JWT_SECRET || "", {
    expiresIn: "1h",
  });

  // Send token or redirect (based on frontend needs)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.redirect("http://localhost:3000/dashboard"); // Change this to your frontend URL
};
