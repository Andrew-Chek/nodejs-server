const {User} = require('../models/Users')
const {Credential} = require('../models/Credentials')
const bcrypt = require('bcryptjs');

const validateRegistrationUser = async (req, res, next) => {
    const { email, password } = req.body;
    if(email == "" || password == "")
    {
      next(new Error("Not enough data for registration"));
      return
    }
    const checkUser = await User.findOne({email})
    if(checkUser != undefined)
    {
      next(new Error("User with such email is already existing"));
      return
    }
    next()
}

const validateLoginUser = async (req, res, next) => {
  const credential = await Credential.findOne({ email: req.body.email });
  if(credential == null)
  {
    next(new Error(`No such user`));
    return;
  }
  const checked = await bcrypt.compare(String(req.body.password), String(credential.password));
  if (!checked)
  {
    next(new Error(`Password isn't correct`));
    return;
  }
  next()
}

const validateChangePassword = async (req, res, next) => {
  const credential = await Credential.findOne({ email: req.user.email })
  const checked = await bcrypt.compare(String(req.body.oldPassword), String(credential.password))
	if (!checked)
  {
    next(new Error(`Old password isn't correct`));
    return;
  }
  next()
}

const validateForgotPassword = async (req, res, next) => {
  const credential = await Credential.findOne({ email: req.body.email })
  if(credential == null)
  {
    next(new Error(`Email isn't correct`))
    return;
  }
  next()
}

module.exports = {
    validateRegistrationUser,
    validateLoginUser,
    validateChangePassword,
    validateForgotPassword
}