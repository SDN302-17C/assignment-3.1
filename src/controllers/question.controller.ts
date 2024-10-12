import { Request, Response } from "express";
import { Question } from "../models/question.model";
import { handleErrors } from "../services/utils.service";
import { Quiz } from "../models/quiz.model";
import { decodeToken, extractToken } from "../middlewares/auth.middleware";

// GET /questions
export const getAllQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const questions = await Question.find().populate(
      "author",
      "-hashedPassword"
    );
    res.json(questions);
  } catch (error: any) {
    handleErrors(res, error);
  }
};

// GET /questions
export const getQuestionByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const question = await Question.findById(req.params["questionId"]).populate(
      "author",
      "-hashedPassword"
    );
    question
      ? res.json(question)
      : res.status(404).json({ message: "Quiz not found" });
  } catch (error: any) {
    handleErrors(res, error);
  }
};

// POST /questions
export const createQuestion = async (
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
    res.status(201).json(question);
  } catch (error: any) {
    handleErrors(res, error);
  }
};

// PUT /questions/:questionId
export const updateQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params["questionId"],
      req.body,
      { new: true }
    );
    question
      ? res.json(question)
      : res.status(404).json({ message: "Question not found" });
  } catch (error: any) {
    handleErrors(res, error);
  }
};

// DELETE /questions/:questionId
export const deleteQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const question = await Question.findByIdAndDelete(req.params["questionId"]);
    question
      ? res.status(204).send()
      : res.status(404).json({ message: "Question not found" });
  } catch (error: any) {
    handleErrors(res, error);
  }
};

export const addQuestionToQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const questionId = req.params["questionId"];
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    const quiz = await Quiz.findById(req.params["quizId"]).populate(
      "questions"
    );
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
