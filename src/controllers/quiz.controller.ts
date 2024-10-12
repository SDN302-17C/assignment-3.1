import { Request, Response } from "express";
import { Quiz } from "../models/quiz.model";
import { Question } from "../models/question.model";
import { handleErrors } from "../services/utils.service";
import { decodeToken, extractToken } from "../middlewares/auth.middleware";

// GET /quizzes
export const getAllQuizzes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const quizzes = await Quiz.find().populate({
      path: "questions",
      populate: {
        path: "author",
        select: "fullName",
      },
    });
    res.json(quizzes);
  } catch (error) {
    handleErrors(res, error);
  }
};

// GET /quizzes/:quizId
export const getQuizById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const quiz = await Quiz.findById(req.params["quizId"]).populate({
      path: "questions",
      populate: {
        path: "author",
        select: "fullName",
      },
    });
    quiz ? res.json(quiz) : res.status(404).json({ message: "Quiz not found" });
  } catch (error) {
    handleErrors(res, error);
  }
};

// POST /quizzes
export const createQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    handleErrors(res, error);
  }
};

// PUT /quizzes/:quizId
export const updateQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params["quizId"], req.body, {
      new: true,
    });
    quiz ? res.json(quiz) : res.status(404).json({ message: "Quiz not found" });
  } catch (error) {
    handleErrors(res, error);
  }
};

// DELETE /quizzes/:quizId
export const deleteQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Quiz.findByIdAndDelete(req.params["quizId"]);
    res.status(204).send();
  } catch (error) {
    handleErrors(res, error);
  }
};

// GET /quizzes/:quizId/populate
export const getQuizByKeyword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const keyword = req.params["keyword"];
    const regex = new RegExp(keyword || "", "i");
    const quiz = await Quiz.findById(req.params["quizId"]).populate({
      path: "questions",
      match: { keywords: { $regex: regex } },
    });
    res.json(quiz);
  } catch (error) {
    handleErrors(res, error);
  }
};

// POST /quizzes/:quizId/question
export const addQuestionToQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = extractToken(req, res);

    if (!token) {
      return;
    }

    const userData = decodeToken(token);

    if (!userData) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const question = new Question({ ...req.body, author: userData._id });
    await question.save();
    const quiz = await Quiz.findById(req.params["quizId"]);
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    quiz.questions.push(question._id);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    handleErrors(res, error);
  }
};

// POST /quizzes/:quizId/questions
export const addQuestionsToQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = extractToken(req, res);

    if (!token) {
      return;
    }

    const userData = decodeToken(token);

    if (!userData) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const questions = req.body.map(
      (q: any) => new Question({ ...q, author: userData._id })
    );
    const newQuestions = await Question.insertMany(questions);
    console.log(newQuestions);
    const quiz = await Quiz.findById(req.params["quizId"]);
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    quiz.questions.push(...newQuestions.map((q) => q["_id"]));
    await quiz.save();
    res.status(201).json(newQuestions);
  } catch (error) {
    handleErrors(res, error);
  }
};
