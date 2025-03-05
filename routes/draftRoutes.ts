import express from "express";
import { authenticateJWT } from "../middlewares/auth"; // Import the middleware
import { saveDraft } from "../handlers/draftHandlers";

const router = express.Router();

router.post("/save", authenticateJWT, saveDraft);

export default router;
