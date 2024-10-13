import { Router } from "express";
import authApi from "./apiRoutes/auth.routes";
import questionApi from "./apiRoutes/question.routes";
import quizApi from "./apiRoutes/quiz.routes";
import userApi from "./apiRoutes/user.routes";

const apiRouter = Router();

apiRouter.use("/auth", authApi);
apiRouter.use("/questions", questionApi);
apiRouter.use("/quizzes", quizApi);
apiRouter.use("/users", userApi);

export default apiRouter;
