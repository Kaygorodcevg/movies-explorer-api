const router = require('express').Router();
const {
  getUserInfo,
  updateUser,
  signOut,
} = require('../controllers/users');
const { updateUserInfo } = require('../middlewares/validation');

router.get('/me', getUserInfo);

router.patch('/me', updateUserInfo, updateUser);

router.post('/', signOut);

module.exports = router;
