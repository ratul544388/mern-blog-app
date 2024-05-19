import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { loginSchema, signupSchema } from "../../validations/index.js";
import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
  const values = req.body;

  const validatedFields = signupSchema.safeParse(values);

  try {
    if (!validatedFields.success) {
      throw next(createHttpError(400, "Invalid fields"));
    }

    const { email, password, username } = values;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: userPassword, ...rest } = user._doc;
    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    const existingField = JSON.stringify(error).includes("username")
      ? "Username"
      : JSON.stringify(error).includes("email")
      ? "Email"
      : "";
    if (existingField) {
      next(createHttpError(409, `${existingField} already exist`));
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  const values = req.body;

  const validatedFields = loginSchema.safeParse(values);

  try {
    if (!validatedFields.success) {
      throw next(createHttpError(400, "Invalid fields"));
    }

    const { emailOrUsername, password } = values;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      throw next(createHttpError(401, "User does not exist!"));
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
      throw next(createHttpError(401, "Incorrect Password!"));
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    const { password: userPassword, ...rest } = user._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};
