const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  summary: {
    type: String,
    trim: true,
  },
  tests: {
    type: String,
    trim: true,
  },
  diagnosis: {
    type: String,
    trim: true,
  },
  treatment: {
    type: String,
    trim: true,
  },
  instructions: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  report: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Report", reportSchema);
