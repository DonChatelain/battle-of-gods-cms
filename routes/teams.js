const express = require('express');
const router = express.Router();

const { Team, SpecialCard, Character, BasicCardClass } = require('../models');

// GET
router.get('/', (req, res, next) => {
  const query = {};
  if (req.query.statsonly == 'true') return next();
  req.query.deckClass ? query.deckClass = req.query.deckClass: null;
  req.query.faction ? query.faction = req.query.faction : null;
  Team
    .find(query)
    .sort({ key: 1 })
    .then(teams => res.json(teams));
});

router.get('/alldata', (req, res) => {
  // TODO: TESTS
  const promises = [];

  // teams find
  promises.push(
    Team.find({}, {
      _id: 0, __v: 0
    })
    .lean()
  );
  // characters by _id: team
  promises.push(
    Character.aggregate([{
      $group: {
        _id: '$team',
        chars: { $push: {
          name: '$name',
          health: '$health',
          minorCount: '$minorCount',
          image: '$image'
        }},
      },
    }])
  );
  // sp cards by character
  promises.push(
    SpecialCard.aggregate([{
      $group: {
        _id: '$owner',
        cards: { $push: {
          name: '$name',
          owner: '$owner',
          effect: '$effect',
          atk: '$atk',
          def: '$def',
          qty: '$qty',
        }}
      }
    }])
  );
  // basic cards find
  promises.push(
    BasicCardClass.find({}, {
      _id: 0, __v: 0, 'cards._id': 0
    })
  )

  Promise.all(promises).then(pRes => {
    const [ teams, charsByTeam, spCardsByChar, bsCards ] = pRes;
    let allData = {};

    allData = teams.reduce((acc, t) => {
      const team = {};
      team[t.key] = t;
      // characters
      const foundChars = charsByTeam.find(c => c._id === t.key)
      team[t.key].characters = foundChars.chars || [];
      // sp cards
      team[t.key].cards = [];
      const foundSpCards = spCardsByChar.filter(x => foundChars.chars.map(c => c.name).indexOf(x._id) !== -1)
      foundSpCards.forEach(fsc => team[t.key].cards.push(...fsc.cards));
      // bs cards
      const foundBsCards = bsCards.find(x => x.colorClass === t.deckClass);
      foundBsCards.cards.forEach(c => team[t.key].cards.push(c));
      return acc = Object.assign(acc, team);
    }, {});
    // phew...
    res.json(allData);
  })
  .catch(error => res.status(500).json({ error }));
});

router.get('/:key', (req, res) => {
  const query = { key: req.params.key };
  Team.findOne(query).then(team => res.json(team));
});

// PATCH
router.patch('/:key', (req, res) => {
  const query = { key: req.params.key };
  delete req.body.key;
  Team.updateOne(query, { $set: req.body })
      .then(team => res.json(team))
      .catch(error => res.json({ error }));
});

// Aggregation
router.get('/', (req, res) => {
  // TODO: Basic cards
  const aggCharacters = new Promise((resolve, reject) => {
    SpecialCard.aggregate([{
      $group: {
        _id: '$owner',
        spQty: { $sum: '$qty' }, 
        totalAtk: { $sum: '$atk' },
        totalDef: { $sum: '$def' }
      }
    }])
    .then(data => resolve(data))
    .catch(error => reject(error));
  });
  const aggTeams = new Promise((resolve, reject) => {
    Character.aggregate([{
      $group: {
        _id: '$team',
        chars: { $push: '$name' },
        totalHealth: { $sum: { $cond: [{$gt: ['$minorCount', null]}, {$multiply: ['$health', '$minorCount']}, '$health'] }}
      }
    }])
    .then(data => resolve(data))
    .catch(error => reject(error));
  });
  Promise.all([aggCharacters, aggTeams]).then(pRes => {
    const [ chars, teams ] = pRes;
    res.json(teams.reduce((acc, team) => {
      const stats = {};
      stats[team._id] = {
        health: team.totalHealth,
        spQty: chars.reduce((sum, char) => team.chars.indexOf(char._id) !== -1 ? sum += char.spQty : sum, 0),
        totalAtk: chars.reduce((sum, char) => team.chars.indexOf(char._id) !== -1 ? sum += char.totalAtk : sum, 0),
        totalDef: chars.reduce((sum, char) => team.chars.indexOf(char._id) !== -1 ? sum += char.totalDef : sum, 0),
      };
      return acc = Object.assign(acc, stats);
    }, {}));
  });
});

module.exports = router;