import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import sendEmail from "../utils/sendEmail.js";

/**
 * POST /api/auth/signup
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate verification token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const verifyUrl = `http://localhost:${process.env.PORT}/api/auth/verify/${token}`;

    await sendEmail(
      email,
      "Verify your email",
      `Hello ${name}, please verify your email: ${verifyUrl}`,
      `<h1>Email Verification</h1><p>Hi ${name},</p><p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`
    );

    return res.status(201).json({
      message: "User created. Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/auth/verify/:token
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid token or user not found" });
    }

    if (user.verified) {
      return res.status(200).json({ message: "Email already verified" });
    }

    user.verified = true;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully. You can now log in." });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

/**
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Please verify your email before login" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    await sendEmail(
      email,
      "New Login Alert",
      `Hello ${user.name}, you just logged in.`,
      `<p>Hi <strong>${user.name}</strong>, you just logged in at ${new Date().toLocaleString()}.</p>`
    );

    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
