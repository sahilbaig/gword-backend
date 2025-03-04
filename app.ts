import express, { json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import passport from "./config/passport"; // Import Passport config
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string, // Use a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set `true` if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
