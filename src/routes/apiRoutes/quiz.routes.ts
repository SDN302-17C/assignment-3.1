import express from "express";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizByKeyword,
  addQuestionToQuiz,
  addQuestionsToQuiz,
} from "../../controllers/quiz.controller";
import { verifyAdmin, verifyUserOrAdmin } from "../../middlewares/auth.middleware";

const router = express.Router();

router.route("/").get(getAllQuizzes).post(verifyAdmin, createQuiz);

router
  .route("/:quizId")
  .get(getQuizById)
  .put(verifyAdmin, updateQuiz)
  .delete(verifyAdmin, deleteQuiz);

router.route("/:quizId/populate/:keyword").get(getQuizByKeyword);

router
  .route("/:quizId/question")
  .post(verifyUserOrAdmin, addQuestionToQuiz);

router.route("/:quizId/questions").post(verifyUserOrAdmin, addQuestionsToQuiz);

export default router;
