import mongoose, { Schema, Document } from "mongoose";

interface IDraft extends Document {
  email: string;
  html: string;
  createdAt: Date;
}

const DraftSchema = new Schema<IDraft>({
  email: { type: String, required: true },
  html: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IDraft>("Draft", DraftSchema);
