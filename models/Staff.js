const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    id: {
      type: String,
      required: true,
      unique: true
    },

    salary: {
      type: Number,
      required: true
    },

    skills: {
      type: [String],
      required: true
    },

    batches: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;