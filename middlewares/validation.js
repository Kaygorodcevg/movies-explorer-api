const { celebrate, Joi } = require('celebrate');
const REGULAR_EXPRESSION = require('../utils/RegularExpression');

module.exports.postCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(REGULAR_EXPRESSION),
  }),
});

module.exports.cardId = celebrate({
  params: Joi.object().keys({ cardId: Joi.string().required().hex().length(24) }),
});

module.exports.userId = celebrate({
  params: Joi.object().keys({ userId: Joi.string().required().hex().length(24) }),
});

module.exports.updateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.updateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(REGULAR_EXPRESSION),
  }),
});

module.exports.signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGULAR_EXPRESSION),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
