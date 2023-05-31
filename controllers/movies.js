const Movie = require('../models/movie');
const { CREATED } = require('../utils/errors');
const ForbiddenError = require('../utils/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((card) => res.status(CREATED).send(card))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Movie.deleteOne(card._id)
          .orFail()
          .then((cardData) => res.send(cardData))
          .catch(next);
      } else {
        next(new ForbiddenError());
      }
    })
    .catch(next);
};
