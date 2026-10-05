const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true
    },

    studentId: {
      type: String,
      required: true
    },

    course: {
      type: String,
      required: true
    },

    staffName: {
      type: String,
      required: true
    },

    staffId: {
      type: String,
      required: true
    },

    batch: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Prevent same staff from being assigned
// to the same batch twice
assignmentSchema.index(
  {
    staffId: 1,
    batch: 1
  },
  {
    unique: true
  }
);

module.exports =
  mongoose.model("Assignment", assignmentSchema);