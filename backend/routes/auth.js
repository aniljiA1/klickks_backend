// backend/routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import { dbPromise } from "../db.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const db = await dbPromise;

  const hashed = await bcrypt.hash(password, 10);
  try {
    await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashed]);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = await dbPromise;

  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  req.session.userId = user.id;
  res.json({ message: "Login successful" });
});

// Session check
router.get("/me", (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

export default router;