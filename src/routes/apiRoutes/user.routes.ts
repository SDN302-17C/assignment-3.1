import express from "express";

import { verifyUser, verifyAdmin } from "../../middlewares/auth.middleware";
import { getAllUsers } from "../../controllers/user.controller";

const router = express.Router();

router.get("/", verifyUser, verifyAdmin, getAllUsers);

export default router;
