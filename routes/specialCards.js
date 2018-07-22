const express = require('express');
const router = express.Router();

const { SpecialCard } = require('../models');

// GET
router.get('/', (req, res) => {
  SpecialCard.find(req.query).then(cards => res.json(cards));
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
})

// DELETE
router.delete('/:id', (req, res) => {
  SpecialCard.remove({ _id: req.params.id })
    .then(card => res.json(card))
    .catch(error => res.json({ error }));
})

module.exports = router;
