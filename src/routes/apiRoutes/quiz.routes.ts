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
import { verifyUser, verifyAdmin } from "../../middlewares/auth.middleware";

const router = express.Router();

router.route("/").get(getAllQuizzes).post(verifyUser, verifyAdmin, createQuiz);

router
  .route("/:quizId")
  .get(getQuizById)
  .put(verifyUser, verifyAdmin, updateQuiz)
  .delete(verifyUser, verifyAdmin, deleteQuiz);

router.route("/:quizId/populate").get(getQuizByKeyword);

router
  .route("/:quizId/question")
  .post(verifyUser, verifyAdmin, addQuestionToQuiz);

router
  .route("/:quizId/questions")
  .post(verifyUser, verifyAdmin, addQuestionsToQuiz);

export default router;
