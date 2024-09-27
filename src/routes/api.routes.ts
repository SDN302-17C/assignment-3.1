import { Router } from "express";
import authApi from "./apiRoutes/auth.routes";
import questionApi from "./apiRoutes/question.routes";
import quizApi from "./apiRoutes/quiz.routes";
import userApi from "./apiRoutes/user.routes";
import { verifyUser, verifyAdmin } from "../middlewares/auth.middleware";

const apiRouter = Router();

apiRouter.use("/auth", authApi);
apiRouter.use("/questions", verifyUser, questionApi);
apiRouter.use("/quizzes", verifyUser, quizApi);
apiRouter.use("/users", verifyAdmin, userApi);

export default apiRouter;
