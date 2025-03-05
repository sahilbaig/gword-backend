import express from "express";
import passport from "passport";
import { handleGoogleCallback } from "../handlers/authHandler";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/drive.file"],
    accessType: "offline",
    prompt: "consent",
  })
);

router.get(
  "/callback/google",
  passport.authenticate("google", { session: false }),
  handleGoogleCallback
);

export default router;
