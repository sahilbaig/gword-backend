import express from "express";
import { authenticateJWT } from "../middlewares/auth"; // Import the middleware
import { saveToDrive } from "../handlers/driveHandlers";

const router = express.Router();

router.post("/save", authenticateJWT, saveToDrive);

export default router;
