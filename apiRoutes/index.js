const express = require('express');
const router = express.Router();

const teamsRouter = require('./teams');
const charactersRouter = require('./characters');
const specialCardsRouter = require('./specialCards');

router.use('/teams', teamsRouter);
router.use('/characters', charactersRouter);
router.use('/specialcards', specialCardsRouter);

module.exports = router;