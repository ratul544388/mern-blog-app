import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  type: {
    type: String,
    require: true,
    enum: ["like", "dislike"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    require: true,
  },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
