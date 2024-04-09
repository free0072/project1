require("dotenv").config();
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.createAccount = asyncHandler(async (req, res) => {
  const { name, uid, email, specialization, password, role } = req.body;
  const existingUser = await User.findOne({
    $or: [{ uid: uid }, { email: email }],
  });
  console.log(existingUser);
  if (existingUser) {
    return res.status(409).json({ error: "Already exist" });
  }
  const image = req.file;

  let imageUrl;

  if (image) {
    const body = {
      image: image.buffer.toString("base64"), // Convert the file buffer to a base64-encoded string
      type: "base64",
    };
    const headers = {
      Authorization: `Client-ID ${process.env.IMGUR_ID}`,
    };

    try {
      const res = await axios.post("https://api.imgur.com/3/upload", body, {
        headers,
      });
      imageUrl = res.data.data.link;
    } catch (error) {
      console.log(error);
      return res.status(501).json({ message: "File Upload Error" });
    }
  }

  const encry_password = bcrypt.hashSync(password);

  const newUser = new User({
    name: name,
    uid: uid,
    email: email,
    password: encry_password,
    specialization: specialization,
    avatar: imageUrl,
    role: role,
  });
  await newUser.save();

  //TODO token
  res.status(200).json({
    _id: newUser._id,
    name: newUser.name,
    uid: newUser.uid,
    email: newUser.email,
    specialization: newUser.specialization,
    avatar: newUser.imageUrl,
    role: newUser.role,
    token: generateToken(newUser._id),
  });
});

exports.verifyAccount = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    return res.status(404).json({ message: "Account doesn't exist" });
  }

  if (bcrypt.compare(password, existingUser.password)) {
    res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      uid: existingUser.uid,
      specialization: existingUser.specialization,
      avatar: existingUser.imageUrl,
      role: existingUser.role,
      email: existingUser.email,
      token: generateToken(existingUser._id),
    });
  } else {
    res.status(401).json({ message: "Password does not match" });
  }
});

exports.getAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ message: "User does not exist" });

  res.status(200).json(user);
});

exports.getAllDoctors = asyncHandler(async (req, res) => {
  const allUser = await User.find({ role: "Doctor" });
  res.status(200).json(allUser);
});


exports.getMe = asyncHandler(async (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};
