const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const router = express.Router();

const JWT_SECRET =
  process.env.JWT_SECRET || "course_assignment_secret";


// =====================================
// CREATE / RESET ADMIN
// =====================================

router.get("/create-admin", async (req, res) => {
  try {

    const hashedPassword =
      await bcrypt.hash("admin123", 10);

    await Admin.findOneAndUpdate(
      { username: "admin" },
      {
        username: "admin",
        password: hashedPassword
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      message: "Admin created/reset successfully",
      username: "admin",
      password: "admin123"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error creating admin",
      error: error.message
    });

  }
});


// =====================================
// ADMIN REGISTER
// =====================================

router.post("/register", async (req, res) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message:
          "Username and password are required"
      });
    }

    const existingAdmin =
      await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin = new Admin({
      username: username,
      password: hashedPassword
    });

    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });

  }
});


// =====================================
// ADMIN LOGIN
// =====================================

router.post("/login", async (req, res) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message:
          "Username and password are required"
      });
    }

    const admin =
      await Admin.findOne({
        username: username
      });

    if (!admin) {
      return res.status(401).json({
        message:
          "Invalid username or password"
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Invalid username or password"
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        username: admin.username
      },
      JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Login successful",
      token: token,
      username: admin.username
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });

  }
});


module.exports = router;