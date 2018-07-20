// CMS Server
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const shortid = require('shortid');

const { Team, Character, SpecialCard } = require('./models');
const apiRoutes = require('./apiRoutes');

const MONGO_URI = process.env.BOG_DB_URI || '';
const PORT = 6660; // update in client/config.js
const app = express();

dotenv.load();
mongoose.connection.on('open', onDBConnect);
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'build')));
app.use('/api', apiRoutes);

// serve index.html and let front end router handle everything...
app.get('*', (req, res, next) => {  
  if (req.url.includes('/api/')) next(); // ...except /api
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
}); 

app.listen(PORT, () => console.log('server up and listening on port', PORT));

function onDBConnect() {

}