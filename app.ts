import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import dotenv from "dotenv";
import passport from "./config/passport"; // Import configured Passport
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import driveRoutes from "./routes/driveRoutes";
import draftRoutes from "./routes/draftRoutes";
import docRoutes from "./routes/docRoutes";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import { VercelRequest, VercelResponse } from "@vercel/node";

dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL?.replace(/\/$/, ""), // Allow requests from the frontend
    credentials: true, // Allow cookies to be sent
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // Secure in production
      httpOnly: true, // Prevent client-side access
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/drive", driveRoutes);
app.use("/draft", draftRoutes);
app.use("/doc", docRoutes);

// Define the shape of the user object
interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
}

// Route to fetch user information
app.get("/api/user", (req: any, res: any) => {
  const token = req.cookies.token; // Access the token from the httpOnly cookie
  console.log(token, "token that I get");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    ) as JwtPayload & User; // Cast to JwtPayload and User

    // Send user information to the frontend
    return res.json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

// Route to handle logout
app.post("/api/logout", (req: Request, res: Response) => {
  res.clearCookie("token"); // Clear the httpOnly cookie
  res.json({ message: "Logged out successfully" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Export the Express app as a Vercel function
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};
