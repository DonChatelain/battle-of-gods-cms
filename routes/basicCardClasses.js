const express = require('express');
const router = express.Router();

const { BasicCardClass } = require('../models');

router.get('/', (req, res) => {
  BasicCardClass
    .find({}, { _id: 0, colorClass: 1 })
    .then(c => res.json(c));
});

router.get('/:color', (req, res) => {
  const query = { colorClass: req.params.color };
  BasicCardClass
    .findOne(query)
    .then(c => res.json(c))
    .catch(error => res.json({ error }));
});

router.patch('/:color', (req, res) => {
  const query = { colorClass: req.params.color };
  delete req.body.colorClass; // definitely don't change color
  BasicCardClass.updateOne(query, { $set: req.body })
    .then(c => res.json(c))
    .catch(error => res.json({ error }));
});

module.exports = router;