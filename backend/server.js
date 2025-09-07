import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { initDb } from "./db.js";
import authRoutes from "./routes/auth.js";

dotenv.config(); // load .env file

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://klickks-frontend-4sir.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === "production", // true in HTTPS
    sameSite: "lax"
  }
}));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("API root is working 🚀");
});

// ✅ Extra health check
app.get("/api", (req, res) => {
  res.json({ status: "API is working", version: "1.0.0" });
});

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// ✅ Init DB and start server
initDb().then(() => {
  app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
});
