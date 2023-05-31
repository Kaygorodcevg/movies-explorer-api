const mainRouter = require('express').Router();
const auth = require('../middlewares/auth');

const signup = require('./signup');
const signin = require('./signin');
const users = require('./users');
const notFound = require('./notFound');
const movies = require('./movies');

mainRouter.use('/signup', signup);
mainRouter.use('/signin', signin);
mainRouter.use('/users', auth, users);
mainRouter.use('*', auth, notFound);
mainRouter.use('/movies', auth, movies);

module.exports = mainRouter;
