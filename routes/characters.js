const express = require('express');
const router = express.Router();

const { Character, SpecialCard } = require('../models');

const DEFAULT_QUERY_LIMIT = 25;

// GET
router.get('/', (req, res) => {
  const q = {};
  if (req.query.name) q.name = req.query.name;
  if (req.query.faction) q.faction = req.query.faction;
  if (req.query.team) q.team = req.query.team;
  if (req.query.health) q.health = req.query.health;
  let limiter = parseInt(req.query.limit) || DEFAULT_QUERY_LIMIT;
  const fields = req.query.fields ? req.query.fields.split(',').join(' ') : { __v: 0 }; // don't worry, this works


  const promises = [];
  promises.push(
    SpecialCard.aggregate([{
      $group: {
        _id: '$owner',
        spCount: { $sum: '$qty' }
      }
    }])
  );
  promises.push(
    Character
      .find(q, fields)
      .sort({ team: 1, index: 1 })
      .limit(limiter)
      .lean()
  );
  Promise.all(promises)
  .then(aResults => {
    const [ spCounts, characters ] = aResults;

    for (let char of characters) {
      for ({ _id, spCount } of spCounts) {
        if (char.name === _id) {
          char.spCount = spCount;
          break;
        }
      }
    }
    res.json(characters);
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ error });
  });

});

router.get('/names', (req, res) => {
  Character
    .find({}, { name: 1 })
    .sort({ team: 1, index: 1 })
    .then(chars => res.json( chars ))
    .catch(error => res.status(500).json({ error }));
});

// GET single detailed character... perhaps unnecessary ? 
router.get('/:id', (req, res) => {
  // const _id = req.params.id;

  // Character.findOne({ _id })
  //   .then(char => {
  //     const promises = [];
  //     promises.push(SpecialCard.find({ owner: char.name }))
  //     promises.push(SpecialCard.countDocuments({ owner: char.name }));
  //     Promise.all(promises).then 
  //   });

  res.json({ hello: 'Oh hai' });

});

// GET stats 

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