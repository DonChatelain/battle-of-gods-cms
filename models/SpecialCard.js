const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  key: String,
  name: String,
  owner: String, // Character.name ?
  effect: String,
  atk: Number,
  def: Number,
  qty: Number,
});