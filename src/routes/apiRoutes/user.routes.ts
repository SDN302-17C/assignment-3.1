import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../../controllers/user.controller";
import { verifyAdmin } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/", verifyAdmin, getAllUsers);
router.get("/:userId", getUserById);
router.post("/",  verifyAdmin,createUser);
router.put("/:userId", verifyAdmin, updateUser);
router.delete("/:userId",  verifyAdmin,deleteUser);

export default router;
