const express = require('express');
const router = express.Router();

const teamsRouter = require('./teams');
const charactersRouter = require('./characters');
const specialCardsRouter = require('./specialCards');
const imageUploadsRouter = require('./imageUploads');

router.use('/teams', teamsRouter);
router.use('/characters', charactersRouter);
router.use('/specialcards', specialCardsRouter);
router.use('/imageuploads', imageUploadsRouter);

module.exports = router;