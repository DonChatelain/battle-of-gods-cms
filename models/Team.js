const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  name: String,
  faction: String,
  deckClass: {
    type: String,
    enum: ['RED', 'BLUE', 'GREEN'],
  },
  key: String
});