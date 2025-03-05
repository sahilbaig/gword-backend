import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import dotenv from "dotenv";
import passport from "./config/passport"; // Import configured Passport
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import driveRoutes from "./routes/driveRoutes";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow requests from the frontend
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
      secure: process.env.NODE_ENV === "production", // Secure in production
      httpOnly: true, // Prevent client-side access
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Adjust for cross-site requests
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/drive", driveRoutes);

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
    res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
