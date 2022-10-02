const { User } = require('../models/Users.js');
const { Credential } = require('../models/Credentials.js');
const bcrypt = require('bcryptjs');
const { Task } = require('../models/Tasks.js');
const { Board } = require('../models/Boards.js');

const getUser = async (req, res, next) => {
  const user = await User.findById( req.user._id );
  res.status(200).send({
    user: {
      _id: user._id,
      email: user.email,
      created_date: user.created_date
    }
  });
};

const changeUserPassword = async (req, res, next) =>
{
  const newPassword = await bcrypt.hash(req.body.newPassword, 10)
  return Credential.findOneAndUpdate({ email: req.user.email }, { $set: { password: newPassword } })
  .then((result) => {
    res.status(200).json({ message: 'Password changed successfully' });
  });
}

const deleteUser = async (req, res, next) => 
{
  await Credential.findOneAndDelete({ email: req.user.email })
  await Task.findOneAndDelete({assigned_to: req.user._id})
  await Board.findOneAndDelete({assigned_to: req.user._id})
  return User.findByIdAndDelete(req.user._id)
  .then(res.status(200).json({ message: "Profile deleted successfully"}))
}

module.exports = {
  getUser,
  deleteUser,
  changeUserPassword
};
