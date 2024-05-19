import createHttpError from "http-errors";
import Post from "../models/post.model.js";

export const getPosts = async (req, res, next) => {
  const { page, q } = req.query;

  const pageNo = Number(page) || 1;

  const limit = 16;
  const skip = (pageNo - 1) * limit;

  const query = {
    ...(q
      ? {
          $or: [
            { title: { $regex: ".*" + q + ".*", $options: "i" } },
            { category: { $regex: ".*" + q + ".*", $options: "i" } },
          ],
        }
      : {}),
  };

  try {
    const posts = await Post.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return next(createHttpError(404, "Post not found"));
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPostBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const post = await Post.findOne({ slug });

    if (!post) {
      return next(createHttpError(404, "Post not found"));
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  const values = req.body;
  try {
    const newPost = await Post.create({
      ...values,
    });

    res.status(200).json(newPost);
  } catch (error) {
    if (JSON.stringify(error).includes("slug")) {
      next(createHttpError(409, "Slug Already exist!"));
    }
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const values = req.body;
  const { id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        ...values,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    if (JSON.stringify(error).includes("slug")) {
      next(createHttpError(409, "Slug Already exist!"));
    }
    next(error);
  }
};

export const deletePosts = async (req, res, next) => {
  try {
    const { postIds } = req.body;

    await Post.deleteMany({ _id: { $in: postIds } });

    res.sendStatus(206);
  } catch (error) {
    next(error);
  }
};
