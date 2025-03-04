import express from "express";
import {
  handleGoogleLogin,
  handleGoogleCallback,
} from "../handlers/authHandler";
import passport from "passport";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/google", handleGoogleLogin);
router.get(
  "/callback/google",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    handleGoogleCallback(req, res, next); // Call handleGoogleCallback inside the wrapper
    next(); // Call next() to continue the middleware chain
  }
);

export default router;
