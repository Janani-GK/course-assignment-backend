const express = require("express");
const Staff = require("../models/Staff");

const router = express.Router();

// GET ALL STAFF
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();

    res.json(staff);
  } catch (error) {
    res.status(500).json({
      message: "Error getting staff",
      error: error.message
    });
  }
});

// ADD STAFF
router.post("/", async (req, res) => {
  try {
    const staff = new Staff(req.body);

    const savedStaff = await staff.save();

    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(500).json({
      message: "Error adding staff",
      error: error.message
    });
  }
});

// UPDATE STAFF
router.put("/:id", async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedStaff);
  } catch (error) {
    res.status(500).json({
      message: "Error updating staff",
      error: error.message
    });
  }
});

// DELETE STAFF
router.delete("/:id", async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);

    res.json({
      message: "Staff deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting staff",
      error: error.message
    });
  }
});

module.exports = router;