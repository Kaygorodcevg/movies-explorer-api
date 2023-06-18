const { FORBIDDEN } = require('./errors');

class ForbiddenError extends Error {
  constructor() {
    super();
    this.message = 'Недостаточно прав для этого действия';
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ForbiddenError;
