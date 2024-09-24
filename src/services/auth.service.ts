import jwt from "jsonwebtoken";
import { server } from "../config/sever.config";
import { handleTokenError } from "./utils.service";

export const generateJWTToken = (payload: any): string | null => {
  try {
    return jwt.sign(payload, server.jwtSecret, {
      expiresIn: server.jwtExpiration,
    });
  } catch (error: any) {
    handleTokenError(error);
    return null;
  }
};

export const verifyJWTToken = (token: string): boolean => {
  try {
    jwt.verify(token, server.jwtSecret);
    return true;
  } catch (error: any) {
    handleTokenError(error);
    return false;
  }
};

export const verifyTokenIsAdmin = (token: string): boolean => {
  try {
    const decodedToken = jwt.verify(token, server.jwtSecret) as any;
    return decodedToken.isAdmin || false;
  } catch (error: any) {
    handleTokenError(error);
    return false;
  }
};

export const decodeTokenPayload = (token: string): any | null => {
  try {
    return jwt.verify(token, server.jwtSecret);
  } catch (error: any) {
    handleTokenError(error);
    return null;
  }
};
