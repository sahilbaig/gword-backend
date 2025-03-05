import { Request, Response } from "express";
import { google } from "googleapis";
import stream from "stream";
const htmlToDocx = require("html-to-docx");

export const saveToDrive = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { html } = req.body;
  const googleToken = req.cookies.googleAccessToken; // Extract access token from headers

  if (!html) {
    res.status(400).json({ error: "No HTML content provided" });
    return;
  }

  try {
    // Generate DOCX from HTML
    const docxBuffer = await htmlToDocx(html);

    // Convert buffer to readable stream
    const bufferStream = new stream.PassThrough();
    bufferStream.end(docxBuffer);

    // Authenticate Google Drive API
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: googleToken });

    const drive = google.drive({ version: "v3", auth });

    // Upload to Google Drive
    const fileMetadata = {
      name: "output.docx",
    };
    const media = {
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      body: bufferStream,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    res
      .status(200)
      .json({ message: "File uploaded to Drive", fileId: response.data.id });
  } catch (error) {
    console.error("Error uploading to Drive:", error);
    res.status(500).json({ error: "Failed to upload to Google Drive" });
  }
};
