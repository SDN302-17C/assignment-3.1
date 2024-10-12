import express from "express";
import {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionByID,
  addQuestionToQuiz,
} from "../../controllers/question.controller";
import {
  verifyAuthor,
  verifyUserOrAdmin
} from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:questionId", getQuestionByID);
router.post("/:questionId/:quizId", verifyAuthor, addQuestionToQuiz);
router.post("/", verifyUserOrAdmin, createQuestion);
router.put("/:questionId", verifyAuthor, updateQuestion);
router.delete("/:questionId", verifyAuthor, deleteQuestion);

export default router;
