import { Request, Response } from "express";
import Draft from "../models/Drafts";
import mongoose, { isValidObjectId } from "mongoose";

export const saveDraft = async (req: Request, res: Response): Promise<void> => {
  const { html, title, id } = req.body;
  const email = (req.user as { email: string })?.email;

  if (!html) {
    res.status(400).json({ error: "No HTML content provided" });
    return;
  }

  try {
    const existingDraft = await Draft.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (existingDraft) {
      existingDraft.html = html;
      existingDraft.title = title;
      await existingDraft.save();
      res.status(200).json({ message: "Draft updated successfully" });
      return;
    } else {
      await Draft.create({ email, html, title });
      res.status(201).json({ message: "Draft created successfully" });
      return;
    }
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({ error: "Failed to save draft" });
    return;
  }
};

export const getDrafts = async (req: Request, res: Response): Promise<void> => {
  const email = (req.user as { email: string })?.email;

  try {
    const drafts = await Draft.find({ email }); // Fetch drafts by user email
    res.status(200).json({ drafts });
    return;
  } catch (error) {
    console.error("Error fetching drafts:", error);
    res.status(500).json({ error: "Failed to retrieve drafts" });
    return;
  }
};

export const getDocs = async (req: Request, res: Response): Promise<void> => {
  const email = (req.user as { email: string })?.email;
  const { id } = req.params;
  try {
    const doc = await Draft.findOne({
      _id: new mongoose.Types.ObjectId(id),
      email,
    });

    if (!doc) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    res.status(200).json({ doc });
    return;
  } catch (error) {
    console.error("Error fetching drafts:", error);
    res.status(500).json({ error: "Failed to retrieve drafts" });
    return;
  }
};
