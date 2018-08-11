// CMS Server
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');

const apiRoutes = require('./routes');

const MONGO_URI = process.env.BOG_DB_URI || '';
const PORT = process.env.NODE_ENV === "production" ? 80 : 6660;
const app = express();

dotenv.load();
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(onDBConnect)
  .catch(err => console.error(err));

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(passport.initialize());
require('./config/passport')(passport); 

app.use('/api', apiRoutes);

// serve index.html and let front end router handle everything...
app.get('*', (req, res, next) => {  
  if (req.url.includes('/api/')) next(); // ...except /api
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
}); 

app.listen(PORT, () => console.log('server up and listening on port', PORT));

function onDBConnect() {
  console.log('successfully connected to MongoDB instance');
}