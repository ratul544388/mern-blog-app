import jwt from 'jsonwebtoken';

export const getUserFromToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next();
    }

    req.user = user;
    next();
  });
};
