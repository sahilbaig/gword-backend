import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Draft document
interface IDraft extends Document {
  email: string;
  html: string;
  createdAt: Date;
  title: String;
}

// Define the schema for the Draft model
const DraftSchema = new Schema<IDraft>({
  email: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
});

// Create and export the Draft model
const Draft = mongoose.model<IDraft>("Draft", DraftSchema);

export default Draft;
