const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).send("User registered successfully!");
  } catch (err) {
    res.status(500).send("Error registering user!");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials!");

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Login failed!");
  }
});

module.exports = router;
