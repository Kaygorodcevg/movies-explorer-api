const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === MODE_PRODUCTION ? JWT_SECRET : DEV_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
