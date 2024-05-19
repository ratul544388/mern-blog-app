import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createHttpError(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(createHttpError(401, "Unauthorized"));
    }

    if (user.role !== "ADMIN") {
      return next(createHttpError(403, "Forbidden: Admin asscess required"));
    }

    next();
  });
};
