const express = require('express');
const router = express.Router();
const { getUser, deleteUser, changeUserPassword} = require('./usersService.js');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateChangePassword } = require('../middleware/userMiddlewares');

router.get('/me', authMiddleware, getUser);

router.delete('/me', authMiddleware, deleteUser);

router.patch('/me/password', authMiddleware, validateChangePassword, changeUserPassword);

module.exports = {
  usersRouter: router,
};
