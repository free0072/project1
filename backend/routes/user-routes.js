const express = require("express");
const Router = express.Router();
const multer = require("multer");
const upload = multer();

const { userAuth } = require("../middlewares/auth");
const {
  createAccount,
  verifyAccount,
  getAccount,
  getMe,
  getAllDoctors,
} = require("../controller/user-controller");

Router.post("/create", upload.single("image"), createAccount);
Router.post("/verify", verifyAccount);
Router.get("/doctors", getAllDoctors);
Router.post("/:id", getAccount);
Router.get("/me", userAuth, getMe);

module.exports = Router;
