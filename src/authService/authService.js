const { User } = require('../models/Users.js');
const { Credential } = require('../models/Credentials.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secretKey = process.env.SECRET_KEY;
const sgMail = require('@sendgrid/mail')
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

const registerUser = async (req, res, next) => {
    const { email, password} = req.body;

    const credential = new Credential({
        email,
        password: await bcrypt.hash(password, 10)
    });

    const createdDate = new Date().toISOString()

    const user = new User({
        email,
        created_date: createdDate
    })

    await credential.save()
        .catch(err => {
            next(err)
        });

    user.save()
    .then(res.status(200).json({message: "Profile created successfully"}))
    .catch(err => {
        next(err);
    });
}
  
const loginUser = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    const payload = { _id: user._id, email: user.email, created_date: user.created_date };
    const jwtToken = jwt.sign(payload, secretKey);
    return res.json({"jwt_token": jwtToken});
}

function generateCode()
{
    let code = ''
    for(let i = 0; i < 8; i++)
    {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

const forgotPassword = async (req, res, next) => {
    const code = generateCode();
    const newPassword = await bcrypt.hash(code, 10);
    await Credential.findOneAndUpdate({email: req.body.email}, { $set: { password: newPassword } })
    const msg = {
        to: req.body.email, // Change to your recipient
        from: 'andrii.chekyrda@gmail.com', // Change to your verified sende
        subject: 'New pass code for angular dashboard',
        text: `Your code: '${code}'`
    }
    sgMail.setApiKey(SENDGRID_API_KEY)
    sgMail.send(msg)
    .then((response) => {
        return res.status(200).json({message: `New password sent to your email address`})
    })
    .catch((error) => {
        next(error)
    })
}

module.exports = {
    registerUser,
    loginUser,
    forgotPassword
}