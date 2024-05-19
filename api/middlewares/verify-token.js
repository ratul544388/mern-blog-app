import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createHttpError(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(createHttpError(401, "Unauthorized"));
    }

    req.user = user;

    next();
  });
};
