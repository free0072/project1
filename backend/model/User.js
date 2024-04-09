const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  specialization: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Doctor", "User"],
    required: true,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
