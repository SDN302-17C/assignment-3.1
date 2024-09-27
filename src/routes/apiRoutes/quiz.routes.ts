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
import { verifyAdmin } from "../../middlewares/auth.middleware";

const router = express.Router();

router.route("/").get(getAllQuizzes).post(createQuiz);

router
  .route("/:quizId")
  .get(getQuizById)
  .put(verifyAdmin, updateQuiz)
  .delete(verifyAdmin, deleteQuiz);

router.route("/:quizId/populate").get(getQuizByKeyword);

router.route("/:quizId/question").post(verifyAdmin, addQuestionToQuiz);

router.route("/:quizId/questions").post(verifyAdmin, addQuestionsToQuiz);

export default router;
