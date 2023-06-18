const mainRouter = require('express').Router();
const auth = require('../middlewares/auth');

const signup = require('./signup');
const signin = require('./signin');
const users = require('./users');
const movies = require('./movies');
const notFound = require('./notFound');

mainRouter.use('/signup', signup);

mainRouter.use('/signin', signin);

mainRouter.use('/users', auth, users);

mainRouter.use('/movies', auth, movies);

mainRouter.use('*', auth, notFound);

module.exports = mainRouter;
