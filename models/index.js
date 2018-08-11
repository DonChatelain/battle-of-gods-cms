const mongoose = require('mongoose');

const CharacterSchema = require('./Character');
const SpecialCardSchema = require('./SpecialCard');
const BasicCardClassSchema = require('./BasicCardClass');
const TeamSchema = require('./Team');
const UserSchema = require('./User');

const Character = mongoose.model('Character', CharacterSchema);
const SpecialCard = mongoose.model('SpecialCard', SpecialCardSchema);
const BasicCardClass = mongoose.model('BasicCard', BasicCardClassSchema);
const Team = mongoose.model('Team', TeamSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
  Character,
  SpecialCard,
  BasicCardClass,
  Team,
  User,
}