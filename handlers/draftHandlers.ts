import { Request, Response } from "express";
import Draft from "../models/Drafts";

export const saveDraft = async (req: Request, res: Response): Promise<void> => {
  const { html } = req.body;
  const email = (req.user as { email: string })?.email;

  if (!html) {
    res.status(400).json({ error: "No HTML content provided" });
    return;
  }

  try {
    const draft = await Draft.create({ email, html });
    res.status(200).json({ message: "Draft saved successfully" });
  } catch (error) {
    console.error("Error uploading to Drive:", error);
    res.status(500).json({ error: "Failed to upload to Google Drive" });
  }
};
