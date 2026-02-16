const express = require("express");
const cors = require("cors");

require("./database/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // 🔥 THIS IS CRITICAL

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// auth routes
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
