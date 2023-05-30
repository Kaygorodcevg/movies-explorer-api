const { CONFLICT } = require('./errors');

class ConflictError extends Error {
  constructor() {
    super();
    this.message = 'Пользователь с таким адресом уже существует';
    this.statusCode = CONFLICT;
  }
}

module.exports = ConflictError;
