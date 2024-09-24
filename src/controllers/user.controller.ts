import { Request, Response } from "express";
import { User } from "../models/user.model";
import { handleErrors } from "../services/utils.service";

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
  userId: string
): Promise<void> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getUserByUsername = async (username: string) => {
	try {
		const user = await User.findOne({ username: username });

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	} catch (error) {
		throw new Error('Error fetching user from database');
	}
};
