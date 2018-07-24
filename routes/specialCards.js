const express = require('express');
const router = express.Router();

const { SpecialCard } = require('../models');

const DEFAULT_QUERY_LIMIT = 10;

// GET
router.get('/', (req, res) => {
  const q = {};
  if (req.query.name) q.name = req.query.name;
  if (req.query.owner) q.owner = req.query.owner;
  if (req.query.effect) q.effect = req.query.effect;
  if (req.query.atk) q.atk = req.query.atk;
  if (req.query.instant) q.instant = req.query.instant;
  if (req.query.def) q.def = req.query.def;
  if (req.query.qty) q.qty = req.query.qty;
  let limiter = parseInt(req.query.limit) || DEFAULT_QUERY_LIMIT;
  const fields = req.query.fields || '';

  SpecialCard
    .find(q, fields.split(',').join(' '))
    .sort({ owner: 1 })
    .limit(limiter)
    .then(cards => res.json(cards));
});

router.get('/:name', (req, res) => {
  const name = req.params.name;
  SpecialCard.findOne({ name }).then(card => res.json(card));
});

// PATCH
router.patch('/:id', (req, res) => {
  const query = { _id: req.params.id };
  console.log(query, req.body)
  SpecialCard.updateOne(query, { $set: req.body })
      .then(card => res.json(card))
      .catch(error => res.json({ error }));
});

// POST
router.post('/', (req, res) => {
  SpecialCard.create(req.body)
    .then(card => res.json(card))
    .catch(error => res.json({ error }));
});

// DELETE
router.delete('/:id', (req, res) => {
  SpecialCard.remove({ _id: req.params.id })
    .then(card => res.json(card))
    .catch(error => res.json({ error }));
});


module.exports = router;
