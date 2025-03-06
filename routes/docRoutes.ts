import express from "express";
import { authenticateJWT } from "../middlewares/auth"; // Import the middleware

import { getDocs } from "../handlers/draftHandlers";

const router = express.Router();

router.get("/:id", authenticateJWT, getDocs);

export default router;
