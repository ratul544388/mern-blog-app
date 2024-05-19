import express from "express";
import { createLike, getLikes } from "../controllers/like.controller.js";
import { validateObjectId } from "../middlewares/validate-object-id.js";
import { getUserFromToken } from "../middlewares/get-user-from-token.js";

const router = express.Router();

router.get(
  "/",
  getUserFromToken,
  validateObjectId("query", "postId"),
  getLikes
);

router.post("/", validateObjectId("query", "postId"), createLike);

export default router;
