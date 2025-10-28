import express from "express";
import User from "../model/userSchema.js";
import crypto from "crypto";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  // Check if user already exists
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const newUser = new User({ username, password, role });
  await newUser.save();

  res.json({ message: "User registered successfully" });
});


router.post("/login", async (req,res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username, password});
    if(!user) return res.status(401).json({message:"Invalid credentials"});

    const token = crypto.randomBytes(16).toString("hex");
    user.token = token;
    await user.save();

    res.json({message: "Login successful",token});
});

export default router;