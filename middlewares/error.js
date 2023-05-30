const {
  CastError,
  DocumentNotFoundError,
  ValidationError,
} = require('mongoose').Error;

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  CONFLICT,
  FORBIDDEN,
} = require('../utils/errors');
const UnauthorizedError = require('../utils/UnauthorizedError');
const ForbiddenError = require('../utils/ForbiddenError');
const NotFoundError = require('../utils/NotFoundError');
const ConflictError = require('../utils/ConflictError');

module.exports = ((err, req, res, next) => {
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST).send({ message: 'Некорректный Id' });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND).send({ message: 'Запрашиваемая информация не найдена' });
  }
  if (err instanceof ValidationError) {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(UNAUTHORIZED).send({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err instanceof ForbiddenError) {
    return res.status(FORBIDDEN).send({ message: err.message });
  }
  if (err instanceof ConflictError) {
    return res.status(CONFLICT).send({
      message: 'Указанный email уже зарегистрирован.',
    });
  }
  res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });

  return next();
});
