import express from "express";
import { postSchema } from "../../validations/index.js";
import {
  createPost,
  deletePosts,
  getPostById,
  getPostBySlug,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateObjectId } from "../middlewares/validate-object-id.js";
import { verifyAdmin } from "../middlewares/verify-admin.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/id/:id", validateObjectId(), getPostById);

router.post("/", verifyAdmin, validateFields(postSchema), createPost);

router.put(
  "/:id",
  verifyAdmin,
  validateObjectId(),
  validateFields(postSchema),
  updatePost
);

router.delete("/delete", verifyAdmin, deletePosts);

export default router;
