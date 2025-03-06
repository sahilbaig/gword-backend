import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Draft from "../models/Drafts";
export const handleGoogleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
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
  res.cookie("token", token, { httpOnly: true });
  res.cookie("googleAccessToken", req.user.accessToken, {
    httpOnly: true,
    secure: true,
  });
  res.cookie("googleRefreshToken", req.user.refreshToken, {
    httpOnly: true,
    secure: true,
  });

  console.log(user.email, "sse this");

  try {
    // Create new draft
    const newDraft = new Draft({
      email: user.email,
      html: "<p></p>", // Default content
      title: "Untitled Draft",
    });

    await newDraft.save();

    // Redirect to the new draft's page
    res.redirect(`${process.env.FRONTEND_URL}/d/${newDraft._id}`);
    return;
  } catch (error) {
    console.error("Error creating draft:", error);
    res.status(500).json({ error: "Failed to create draft" });
    return;
  }
};
