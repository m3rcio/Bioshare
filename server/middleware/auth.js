require('dotenv').config();
const tokenkey= process.env.tokenkey;
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Acesso negado');

  try {
    const verified = jwt.verify(token, tokenkey);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send('Token expirado');
    }
    return res.status(400).send('Token inválido');
  }
};