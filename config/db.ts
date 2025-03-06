import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      maxPoolSize: 50, // Increase connection pool size
      socketTimeoutMS: 45000, // Increase socket timeout
      family: 4, // Force IPv4 to avoid IPv6 issues
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit the process with an error code
  }
};

export default connectDB;
