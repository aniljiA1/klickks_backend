// backend/server.js
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

// Middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true if using HTTPS
}));

//  Root test route
app.get("/", (req, res) => {
  res.send(" API is working...");
});


// Routes
app.use("/api/auth", authRoutes);

// Init DB and start server
initDb().then(() => {
  app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
});
