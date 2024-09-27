import express from "express";
import {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionByID,
} from "../../controllers/question.controller";
import { verifyAuthor } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:questionId", getQuestionByID);
router.post("/", createQuestion);
router.put("/:questionId", verifyAuthor, updateQuestion);
router.delete("/:questionId", verifyAuthor, deleteQuestion);

export default router;
