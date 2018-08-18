const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  atk: Number,
  def: Number,
  qty: Number,
  rng: Boolean,
});

module.exports = new Schema({
  colorClass: String,
  cards: [ CardSchema ],
});

