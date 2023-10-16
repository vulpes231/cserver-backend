const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const detailSchema = new Schema({
  timestamp: {
    type: String,
    required: true,
  },
  datestamp: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const packageSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  tracking: {
    type: Number,
    required: true,
  },
  status: {
    type: [String],
    default: ["pending"], // Default status is "pending"
  },
  details: [detailSchema],
});

module.exports = mongoose.model("Package", packageSchema);
