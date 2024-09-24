import { Request, Response, NextFunction } from 'express';
import {
  decodeTokenPayload,
  verifyJWTToken,
  verifyTokenIsAdmin,
} from '../services/auth.service';
import { Question } from '../models/question.model';

const extractToken = (req: Request, res: Response): string | null => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    res.status(401).json({ message: 'Unauthorized' });
    return null;
  }
  return token;
};

const verifyToken = (req: Request, res: Response, verifyFn: (token: string) => boolean): string | null => {
  const token = extractToken(req, res);
  if (!token) return null;

  const result = verifyFn(token);
  if (!result) {
    res.status(403).json({ message: 'Forbidden' });
    return null;
  }

  const payload = decodeTokenPayload(token);
  req.body.user = payload;
  return token;
};

export const verifyUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (verifyToken(req, res, verifyJWTToken)) {
    return next();
  }
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (verifyToken(req, res, verifyTokenIsAdmin)) {
    return next();
  }
};

export const verifyAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = verifyToken(req, res, verifyJWTToken);
  if (!token) return;

  try {
    const question = await Question.findById(req.params['questionId']);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.author.toString() !== req.body.user.userId) {
      return res.status(403).json({ message: 'You are not the author of this question' });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};