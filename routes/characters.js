const express = require('express');
const router = express.Router();

const { Character } = require('../models');

// GET
router.get('/', (req, res) => {
  Character.find(req.query).then(chars => res.json(chars));
});
router.get('/:name', (req, res) => {
  const name = req.params.name;
  Character.findOne({ name }).then(char => res.json(char));
});

// PATCH
router.patch('/:index', (req, res) => {
  const query = { index: req.params.index };
  delete req.body.team;
  delete req.body.index;
  Character.updateOne(query, { $set: req.body })
      .then(char => res.json(char))
      .catch(error => res.json({ error }));
});

module.exports = router;