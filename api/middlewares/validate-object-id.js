import createHttpError from "http-errors";
import mongoose from "mongoose";

export const validateObjectId =
  (type = "params", name = "id") =>
  (req, res, next) => {
    if (!mongoose.isValidObjectId(req[type][name])) {
      return next(createHttpError(400, `Invalid objectId: ${name}`));
    }
    next();
  };
