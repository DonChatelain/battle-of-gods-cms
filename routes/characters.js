const express = require('express');
const router = express.Router();

const { Character } = require('../models');

const DEFAULT_QUERY_LIMIT = 25;

// GET
router.get('/', (req, res) => {
  const q = {};
  if (req.query.name) q.name = req.query.name;
  if (req.query.faction) q.faction = req.query.faction;
  if (req.query.team) q.team = req.query.team;
  if (req.query.health) q.health = req.query.health;
  let limiter = parseInt(req.query.limit) || DEFAULT_QUERY_LIMIT;
  const fields = req.query.fields || '';

  Character
    .find(q, fields.split(',').join(' '))
    .sort({ team: 1, name: 1 })
    .limit(limiter)
    .then(chars => res.json(chars))
    .catch(err => console.error(err));
});
router.get('/:name', (req, res) => {
  const name = req.params.name;
  Character.findOne({ name }).then(char => res.json(char));
});

// PATCH
router.patch('/:id', (req, res) => {
  const query = { _id: req.params.id };
  delete req.body.team;
  delete req.body.id;
  delete req.body.index;
  Character.updateOne(query, { $set: req.body })
      .then(char => res.json(char))
      .catch(error => res.json({ error }));
});

module.exports = router;