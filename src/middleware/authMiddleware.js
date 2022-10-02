const jwt = require('jsonwebtoken');
const secretKey = 'secret-jwt-key'

const authMiddleware = (req, res, next) => {
  const  {
    authorization
  } = req.headers;

  if (!authorization) {
    return res.status(400).json({ 'message': 'Please, provide authorization header' });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return res.status(400).json({ 'message': 'Please, include token to request' });
  }

  try {
    const tokenPayload = jwt.verify(token, secretKey);
    req.user = {
      _id: tokenPayload._id,
      email: tokenPayload.email,
      created_date: tokenPayload.created_date
    }
    next();
  } catch (err) {
    return res.status(400).json({message: err.message});
  }

}

module.exports = {
  authMiddleware
}
