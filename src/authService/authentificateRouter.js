const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword } = require('./authentificateService.js');
const { validateRegistrationUser, validateLoginUser, validateForgotPassword } = require('../middleware/userMiddlewares.js');

router.post('/register', validateRegistrationUser, registerUser);

router.post('/login', validateLoginUser, loginUser);

router.post('/forgot_password', validateForgotPassword, forgotPassword)

module.exports = {
  authentificateRouter: router,
};