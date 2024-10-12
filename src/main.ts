import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.connect";
import { server } from "./config/sever.config";
import apiRouter from "./routes/api.routes";

const app = express();

const corsOptions = {
  origin: server.origin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.use("/", apiRouter);


connectDB().then(() => {
  app.listen(server.port, () => {
    console.log(`Server is running on http://${server.host}:${server.port}/`);
  });
});
