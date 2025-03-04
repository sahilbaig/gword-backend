import express from "express";
import passport from "passport";
import { handleGoogleCallback } from "../handlers/authHandler";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback/google",
  passport.authenticate("google", { session: false }),
  handleGoogleCallback
);

export default router;
