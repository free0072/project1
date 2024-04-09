require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");

exports.userAuth = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Not Auth" });
    }
  } else {
    res.status(401).json({ message: "No Auth, No Token Found" });
  }
});
