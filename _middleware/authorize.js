const jwt = require('jsonwebtoken');
const { secret } = require('../config/config.json');
const User = require("../models/user.model.js");

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(
    token,
    global.gConfig.web_token_secret
  );
  req.userData = decoded;
  next();
  } catch (err) {
    return res.status(401).send({
    message: 'Invalid session!'
  });
  }
}
