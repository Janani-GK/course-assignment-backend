const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

// GET ALL ASSIGNMENTS
router.get("/", async (req, res) => {
  try {
    const assignments =
      await Assignment.find().sort({
        createdAt: -1
      });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({
      message: "Error getting assignments",
      error: error.message
    });
  }
});

// ADD ASSIGNMENT
router.post("/", async (req, res) => {
  try {
    const assignment =
      new Assignment(req.body);

    const savedAssignment =
      await assignment.save();

    res.status(201).json(savedAssignment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "This staff member is already assigned to this batch"
      });
    }

    res.status(500).json({
      message: "Error adding assignment",
      error: error.message
    });
  }
});

// DELETE ASSIGNMENT
router.delete("/:id", async (req, res) => {
  try {
    const deletedAssignment =
      await Assignment.findByIdAndDelete(
        req.params.id
      );

    if (!deletedAssignment) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    res.json({
      message: "Assignment deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting assignment",
      error: error.message
    });
  }
});

module.exports = router;