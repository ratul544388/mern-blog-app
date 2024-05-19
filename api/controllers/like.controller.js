import Like from "../models/like.model.js";

export const getLikes = async (req, res, next) => {
  const { postId } = req.query;
  const userId = req.user.id;

  try {
    const userLikePromise = userId
      ? Like.findOne({
          post: postId,
          user: userId,
        })
      : Promise.resolve(null);

    const likeCountPromise = Like.countDocuments({
      type: "like",
      post: postId,
    });
    const dislikeCountPromise = Like.countDocuments({
      type: "dislike",
      post: postId,
    });

    const [userLike, likeCount, dislikeCount] = await Promise.all([
      userLikePromise,
      likeCountPromise,
      dislikeCountPromise,
    ]);

    const isLiked = userLike?.type === "like";
    const isDisliked = userLike?.type === "dislike";

    res.status(200).json({
      isLiked,
      isDisliked,
      likeCount,
      dislikeCount,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createLike = async (req, res, next) => {
  const { postId, type } = req.query;
  const userId = req.user.id;

  try {
    const like = await Like.findOne({ post: postId, user: userId });
    let newLike;
    if (like) {
      if (like.type === type) {
        await Like.deleteOne({ _id: like._id });
        return res.sendStatus(204);
      }
      newLike = await Like.updateOne(
        { _id: like._id },
        {
          type,
        },
        {
          new: true,
        }
      );
      return res.status(200).json(newLike);
    }

    newLike = await Like.create({
      type,
      user: userId,
      post: postId,
    });

    res.status(201).json(newLike);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
