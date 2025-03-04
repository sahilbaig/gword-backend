import express from "express";
import { getDashboard } from "../handlers/dashBoardHandler";
import { authenticateJWT } from "../middlewares/auth"; // Import the middleware

const router = express.Router();

router.get("/", authenticateJWT, getDashboard);

export default router;
