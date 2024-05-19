import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comment.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { commentSchema } from "../../validations/index.js";
import { validateObjectId } from "../middlewares/validate-object-id.js";
import { verifyToken } from "../middlewares/verify-token.js";

const router = express.Router();

router.get("/", getComments);

router.post(
  "/",
  verifyToken,
  validateObjectId("query", "postId"),
  validateFields(commentSchema),
  createComment
);

router.put(
  "/:id",
  validateObjectId(),
  validateFields(commentSchema),
  updateComment
);

router.delete("/:id", validateObjectId(), deleteComment);

export default router;
