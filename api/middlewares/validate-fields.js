import createHttpError from "http-errors";

export const validateFields = (schema) => (req, res, next) => {
  const validatedFields = schema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(createHttpError(400, "Invalid fields"));
  }
  next();
};
