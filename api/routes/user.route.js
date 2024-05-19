import express from "express";
import {
  deleteUsers,
  getUsers,
  updateUser,
  changeRole,
} from "../controllers/user.controller.js";
import { verifyAdmin } from "../middlewares/verify-admin.js";
import { verifyToken } from "../middlewares/verify-token.js";

const router = express.Router();

router.get("/", verifyAdmin, getUsers);
router.put("/update/:userId", verifyToken, updateUser);
router.put("/change-role/:userId/:role", verifyToken, changeRole);
router.delete("/delete", verifyToken, deleteUsers);

export default router;
