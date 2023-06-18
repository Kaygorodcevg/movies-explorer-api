const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { signUp } = require('../middlewares/validation');

router.post('/', signUp, createUser);

module.exports = router;
