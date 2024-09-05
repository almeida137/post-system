const jwt = require('jsonwebtoken');
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Não autorizado' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
