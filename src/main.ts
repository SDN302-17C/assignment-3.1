import express from "express";
import morgan from "morgan";
import quizRoutes from "./routes/quiz.routes";
import questionRoutes from "./routes/question.routes";
import connectDB from "./config/db.connect";
import { server } from "./config/sever.config";

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
// app.use("/api/users", userRoutes);

connectDB().then(() => {
  app.listen(server.port, () => {
    console.log(`Server is running on http://${server.host}:${server.port}/`);
  });
});
