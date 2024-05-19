import Comment from "../models/comment.model.js";

export const getComments = async (req, res, next) => {
  const { page, postId, orderBy } = req.query;

  const pageNo = Number(page) || 1;
  const limit = 15;
  const skip = (pageNo - 1) * limit;

  try {
    const comments = await Comment.find({ post: postId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: Number(orderBy) })
      .populate("user");

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  const { postId } = req.query;
  const values = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.create({
      ...values,
      user: userId,
      post: postId,
    });

    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  const { id } = req.params;
  const values = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      {
        ...values,
      },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Comment.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
