import express from 'express';
import {
    getAllQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizByKeyword,
    addQuestionToQuiz,
    addQuestionsToQuiz
} from '../controllers/QuizController';
import { verifyUser, verifyAdmin } from '../controllers/Authenticate';

const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/:quizId', getQuizById);
router.post('/', verifyUser, verifyAdmin, createQuiz);
router.put('/:quizId', verifyUser, verifyAdmin, updateQuiz);
router.delete('/:quizId', verifyUser, verifyAdmin, deleteQuiz);
router.get('/:quizId/populate', getQuizByKeyword);
router.post('/:quizId/question', verifyUser, verifyAdmin, addQuestionToQuiz);
router.post('/:quizId/questions', verifyUser, verifyAdmin, addQuestionsToQuiz);

export default router;