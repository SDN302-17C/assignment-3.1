import { Response } from "express";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export const handleErrors = (res: Response, error: any) => {
  res.status(500).json({ error: "Internal Server Error" });
};

export const handleTokenError = (error: any) => {
  console.error(error.message);
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
