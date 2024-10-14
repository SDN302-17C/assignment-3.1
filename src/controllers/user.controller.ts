import { Request, Response } from "express";
import { IUser, User } from "../models/user.model";
import { handleErrors, hashPassword } from "../services/utils.service";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select("-hashedPassword");
    res.json(users);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params["userId"]).select("-hashedPassword");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, username, password, admin } = req.body;

    if (!fullName || !username || !password) {
      res.status(400).json({ error: "Full name, Username and password are required" });
      return;
    }

    const userExists = await User.findOne({ username: username });
    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = new User(<IUser>{
      fullName: fullName,
      username: username,
      hashedPassword: hashedPassword,
      admin: admin || false,
    });

    await user.save();

    const { hashedPassword: _, ...newUser } = user.toObject();

    res.status(201).json(newUser);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, password, admin } = req.body;

    const user = await User.findById(req.params["userId"]);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (password !== undefined) user.hashedPassword = await hashPassword(password);
    if (admin !== undefined) user.admin = admin;

    await user.save();

    const { hashedPassword: _, ...updatedUser } = user.toObject();
    res.json(updatedUser);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params["userId"]);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await user.deleteOne();
    res.status(200).json({ message: `User ${user.fullName} has been deleted` });
  } catch (error) {
    handleErrors(res, error);
  }
};
