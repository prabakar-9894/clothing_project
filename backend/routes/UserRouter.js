import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const UserRouter = express.Router();
const JWT_SECRET = "your_secret_key";

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Fetch all users
UserRouter.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map(user => ({ id: user._id, ...user.toObject() }))); // Include ID explicitly
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Fetch a specific user by ID
UserRouter.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ id: user._id, ...user.toObject() }); // Include ID explicitly
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new user
UserRouter.post("/api/users", upload.single("image"), async (req, res) => {
  try {
    const { name, mail, contactNumber, password, confirmPassword } = req.body;
    const image = req.file ? req.file.filename : "";

    if (!name || !mail || !password || password !== confirmPassword) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const newUser = new User({
      name,
      mail,
      contactNumber,
      password,
      image,
    });

    await newUser.save();
    res.status(201).json({ id: newUser._id, ...newUser.toObject() }); // Include ID explicitly
  } catch (err) {
    res.status(500).json({ message: "Error adding user" });
  }
});
// Login Route
UserRouter.post("/api/login", async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ mail });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ id: user._id, token }); // Include ID in response
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err });
  }
});

// Fetch logged-in user details
UserRouter.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json({ id: user._id, ...user.toObject() }); // Include ID explicitly
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
});

export default UserRouter;