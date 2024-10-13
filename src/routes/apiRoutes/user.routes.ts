import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, getUserByUsername, updateUser } from "../../controllers/user.controller";
import { verifyAdmin } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/", verifyAdmin, getAllUsers);
router.get("/:userId",  verifyAdmin, getUserById);
router.get("/:username",  getUserByUsername);
router.post("/",  verifyAdmin,createUser);
router.put("/:userId", verifyAdmin, updateUser);
router.delete("/:userId",  verifyAdmin,deleteUser);

export default router;
