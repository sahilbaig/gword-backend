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
  const user = req.user;

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

  res.cookie("googleAccessToken", req.user.accessToken, {
    httpOnly: true,
    secure: true,
  });

  res.cookie("googleRefreshToken", req.user.refreshToken, {
    httpOnly: true,
    secure: true,
  });
  res.redirect("http://localhost:3000/dashboard");
};
