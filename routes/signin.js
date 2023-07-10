const router = require('express').Router();
const { login } = require('../controllers/users');
const { signIn } = require('../middlewares/validation');

router.post('/', signIn, login);

module.exports = router;
