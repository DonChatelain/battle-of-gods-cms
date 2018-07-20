const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  id: String,
  name: String,
  health: Number,
  faction: String,
  image: String,
  description: String,
  team: String, // Team.name ?
  minorCount: { type: Number, required: false },
  index: Number,
});