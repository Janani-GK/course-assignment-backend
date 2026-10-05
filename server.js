const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const staffRoutes = require("./routes/staffRoutes");
const studentRoutes = require("./routes/studentRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/assignments", assignmentRoutes);

app.get("/", (req, res) => {
  res.send("Course Assignment Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});