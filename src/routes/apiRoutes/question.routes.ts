import express from "express";
import {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionByID,
} from "../../controllers/question.controller";
import { verifyUser, verifyAuthor } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:questionId", getQuestionByID);
router.post("/", verifyUser, createQuestion);
router.put("/:questionId", verifyUser, verifyAuthor, updateQuestion);
router.delete("/:questionId", verifyUser, verifyAuthor, deleteQuestion);

export default router;
