import { Request, Response } from "express";
// import htmlToDocx from "html-to-docx";
const htmlToDocx = require("html-to-docx");

import fs from "fs";

export const saveToDrive = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { html } = req.body;
  const googleToken = req.cookies.token;
  if (!html) {
    res.status(400).json({ error: "No HTML content provided" });
    return;
  }
  if (!googleToken) {
    res.status(401).json({ error: "Missing Google OAuth token" });
    return;
  } // this can be taken out ... TODO

  try {
    const docxBuffer = await htmlToDocx(html);
    const filePath = "C:/Users/sahil/OneDrive/Desktop/output.docx";

    fs.writeFileSync(filePath, docxBuffer);

    res.status(200).json({ message: "File saved successfully", filePath });
  } catch (error) {
    console.error("Error generating DOCX:", error);
    res.status(500).json({ error: "Failed to generate DOCX" });
  }
};
