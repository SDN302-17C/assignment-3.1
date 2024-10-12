import { Request, Response } from "express";
import { generateJWTToken } from "../services/auth.service";
import { User } from "../models/user.model";
const bcrypt = require("bcrypt");

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.hashedPassword))) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    let token = generateJWTToken({
      _id: user._id,
      username: user.username,
      isAdmin: user.admin || false,
    });

    if (!token) {
      return res.status(500).json({ error: "Error generating token" });
    }

    return res
      .status(200)
      .json({ token: token, username: username, message: "Login successful" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password } = req.body;

    if (!fullName || !username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName: fullName,
      username: username,
      hashedPassword: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({
        fullName: fullName,
        username: username,
        message: "Registration successful",
      });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
