const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../utils/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail()
    .then((userData) => res.send(userData))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, name,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => User.findOne(user)
      .then((userData) => res.send(userData)))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError());
      }
      return next();
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === MODE_PRODUCTION ? JWT_SECRET : DEV_KEY,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.cookie('jwt', 'none', {
    maxAge: 3000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.send({ message: 'Вы вышли' });
};
