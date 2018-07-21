const express = require('express');
const router = express.Router();

const { Team } = require('../models');

// GET
router.get('/', (req, res) => {
  const query = {};
  req.query.deckClass ? query.deckClass = req.query.deckClass: null;
  req.query.faction ? query.faction = req.query.faction : null;
  Team
    .find(query)
    .sort({ key: 1 })
    .then(teams => res.json(teams));
});
router.get('/:key', (req, res) => {
  const query = { key: req.params.key };
  Team.findOne(query).then(team => res.json(team));
});
// TODO: aggregated stats option (calling Character and SpecialCard collections, etc.)

// PATCH
router.patch('/:key', (req, res) => {
  const query = { key: req.params.key };
  delete req.body.key;
  Team.updateOne(query, { $set: req.body })
      .then(team => res.json(team))
      .catch(error => res.json({ error }));
});

// DELETE

module.exports = router;