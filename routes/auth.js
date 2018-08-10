const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');

const { User } = require('../models');
const secret = process.env.BOG_AUTH_SECRET;

router.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.password) {
    return res.json({ success: false, msg: 'no user name and or password in request'});
  }
  const user = new User({
    name: req.body.name,
    password: req.body.password,
  })
  user.save(err => {
    if (err) return res.json({ success: false, msg: 'failed to save user ' + err });
    res.json({ success: true, msg: 'User added; Great job, you!' })
  })
});

router.post('/signin', (req, res) => {
  User
    .findOne({ name: req.body.name })
    .then(user => {
      if (!user) return res.json({ success: false, msg: 'User Not Found' })
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          delete user.password;
          const token = jwt.encode(user, secret);
          res.json({ success: true, token: 'bearer ' + token })
        } else {
          res.json({ success: false, msg: 'Incorrect Password' })
        }
      })
    })
    .catch(err => {
      res.json({
        success: false,
        msg: 'error finding user; ' + err,
      })
    })
});

module.exports = router;