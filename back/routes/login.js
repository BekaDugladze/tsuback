const express = require('express');
const router = express.Router();const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, '_E3UKjjYqhJudBkLPTgUvlUYqMplkcYU', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;




  module.exports = router