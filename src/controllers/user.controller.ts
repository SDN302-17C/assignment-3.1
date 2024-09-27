import { Request, Response } from "express";
import { IUser, User } from "../models/user.model";
import { handleErrors, hashPassword } from "../services/utils.service";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getUserById = async (
  res: Response,
  req: Request
): Promise<void> => {
  try {
    const user = await User.findById(req.params["userId"]);
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
    const { username, password, admin } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const userExists = await User.findOne({ username: username });
    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = new User(
      <IUser>{
        username: username,
        hashedPassword: hashedPassword,
        admin: admin || false,
      }
    );

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    handleErrors(res, error);
  }
}

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password, admin } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const user = await User.findById(req.params["userId"]);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.username = username;
    user.hashedPassword = await hashPassword(password);
    user.admin = admin || false;

    await user.save();
    res.json(user);
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
    res.json(user);
  } catch (error) {
    handleErrors(res, error);
  }
};
