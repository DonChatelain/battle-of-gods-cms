// CMS Server
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jwt-simple');

const { Team, Character, SpecialCard, User } = require('./models');
const apiRoutes = require('./routes');

const MONGO_URI = process.env.BOG_DB_URI || '';
const secret = process.env.BOG_AUTH_SECRET;
const PORT = process.env.NODE_ENV === "production" ? 80 : 6660;
const app = express();

dotenv.load();
mongoose.connection.on('open', onDBConnect);
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.use('static', express.static(path.resolve(__dirname, 'build')));
app.use(passport.initialize());
require('./config/passport')(passport); 
app.use('/api', apiRoutes);


// serve index.html and let front end router handle everything...
app.get('*', passport.authenticate('jwt', { session: false }), (req, res, next) => {  
  if (req.url.includes('/api/')) return next(); // ...except /api
  
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) return res.json({ success: false, msg: 'no token provided' });

  const decoded = jwt.decode(token, secret) || {};
  User
    .findOne({ name: decoded.name })
    .then(user => {
      if (!user) return res.json({ success: false, msg: 'No user found, auth failed' })
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
    .catch(err => {
      res.json({ success: false, msg: 'encounted error while finding user in db; ' + err });
    });
}); 

app.listen(PORT, () => console.log('server up and listening on port', PORT));

function onDBConnect() {

}