import express from "express";
import { authenticateJWT } from "../middlewares/auth"; // Import the middleware
import { saveDraft, getDrafts } from "../handlers/draftHandlers";

const router = express.Router();

router.post("/save", authenticateJWT, saveDraft);
router.get("/user", authenticateJWT, getDrafts);

export default router;
