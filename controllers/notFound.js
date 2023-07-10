const NotFoundError = require('../utils/NotFoundError');

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
};
