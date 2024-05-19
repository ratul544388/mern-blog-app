import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import createHttpError, { isHttpError } from "http-errors";
import mongoose from "mongoose";
import morgan from "morgan";
import postRoutes from "./routes/post.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import commentRoutes from "./routes/comment.route.js";
import likeRoutes from "./routes/like.route.js";
import { verifyToken } from "./middlewares/verify-token.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
  console.log("Connected to MongoDB");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", verifyToken, likeRoutes);
app.get("/api/test", (req, res) => {
  res.status(200).json("Api is working");
});

app.use(express.static(path.join(__dirname, "./frontend/dist")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

app.use((error, req, res, next) => {
  console.log(error);
  let errorMessage = "An unknown error occured";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});
