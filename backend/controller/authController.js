const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Signup Request Received:", req.body);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("🔒 Hashed Password Before Saving:", hashedPassword);

    const user = await User.create({ name, email, password: hashedPassword });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
    console.log("User created successfully:", { userId: user.id, email });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.login = async (req, res) => {
  console.log(process.env.JWT_SECRET);
  try {
    const { email, password } = req.body;
    console.log("📥 Login Request Received:", { email });

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.warn("⚠️ Login failed: User not found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("stored password", user.password);
    console.log("input password", password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn("⚠️ Login failed: Incorrect password for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ User logged in successfully:", { userId: user.id, email });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
