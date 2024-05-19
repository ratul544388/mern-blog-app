import createHttpError from "http-errors";
import { updateProfileSchema } from "../../validations/index.js";
import User from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
  const values = req.body;
  const { userId } = req.params;
  const validatedFields = updateProfileSchema.safeParse(values);
  try {
    if (!validatedFields.success) {
      next(createHttpError(400, "Invalid fields"));
    }

    const { username, image } = values;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          image,
          image,
        },
      },
      { new: true }
    );

    console.log(updatedUser._doc);

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    if (JSON.stringify(error).includes("username")) {
      next(createHttpError(409, "Username already exist!"));
    }
    next(error);
  }
};

export const deleteUsers = async (req, res, next) => {
  try {
    const { ids } = req.body;

    await User.deleteMany({ _id: { $in: ids }, role: { $ne: "ADMIN" } });

    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  const { page, role } = req.query;

  const pageNo = Number(page) || 1;

  const limit = 16;
  const skip = (pageNo - 1) * limit;

  try {
    const users = await User.find({
      role,
    })
      .skip(skip)
      .limit(limit);

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const changeRole = async (req, res, next) => {
  const { userId, role } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        role,
      },
      { new: true }
    );

    console.log(updatedUser._doc);

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    if (JSON.stringify(error).includes("username")) {
      next(createHttpError(409, "Username already exist!"));
    }
    next(error);
  }
};
