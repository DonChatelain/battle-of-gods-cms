const mongoose = require('mongoose');

const CharacterSchema = require('./Character');
const SpecialCardSchema = require('./SpecialCard');
const TeamSchema = require('./Team');
const UserSchema = require('./User');

// characters collection
const Character = mongoose.model('Character', CharacterSchema);
// specialcards collection
const SpecialCard =mongoose.model('SpecialCard', SpecialCardSchema);
// teams collection
const Team = mongoose.model('Team', TeamSchema);
// Users
const User = mongoose.model('User', UserSchema);

module.exports = {
  Character,
  SpecialCard,
  Team,
  User,
}