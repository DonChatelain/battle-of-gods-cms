const mongoose = require('mongoose');

const CharacterSchema = require('./Character');
const SpecialCardSchema = require('./SpecialCard');
const TeamSchema = require('./Team');

// characters collection
const Character = mongoose.model('Character', CharacterSchema);
// specialcards collection
const SpecialCard =mongoose.model('SpecialCard', SpecialCardSchema);
// teams collection
const Team = mongoose.model('Team', TeamSchema);

module.exports = {
  Character,
  SpecialCard,
  Team,
}