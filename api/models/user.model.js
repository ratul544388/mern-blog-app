import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "USER",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
