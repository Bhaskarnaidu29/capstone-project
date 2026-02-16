const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database/db");

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashed],
    err => {
      if (err) return res.json({ message: "User already exists" });
      res.json({ message: "Signup successful" });
    }
  );
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (!user) return res.json({ message: "User not found" });

      const match = await bcrypt.compare(password, user.password);
      res.json({
        message: match ? "Login successful" : "Wrong password"
      });
    }
  );
});

module.exports = router;
