import { Request, Response, NextFunction } from "express";
import { Question } from "../models/question.model";
import { Types } from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    admin: boolean;
  };
}

export const verifyUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  next();
};

export const verifyAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.admin) {
    return next();
  } else {
    const err = new Error("You are not authorized to perform this operation!");
    res.status(403);
    return next(err);
  }
};

export const verifyAuthor = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const question = await Question.findById(req.params["questionId"]);
    if (question && question.author.equals(req.user?._id)) {
      return next();
    } else {
      const err = new Error("You are not the author of this question");
      res.status(403);
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};
