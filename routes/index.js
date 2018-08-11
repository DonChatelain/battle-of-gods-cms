const express = require('express');
const passport = require('passport');

const teamsRouter = require('./teams');
const charactersRouter = require('./characters');
const specialCardsRouter = require('./specialCards');
const basicCardClassesRouter = require('./basicCardClasses')
const imageUploadsRouter = require('./imageUploads');
const authRouter = require('./auth');

const router = express.Router();

router.use('/auth', authRouter);

router.all('*', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  next();
});

router.use('/teams', teamsRouter);
router.use('/characters', charactersRouter);
router.use('/specialcards', specialCardsRouter);
router.use('/basiccardclasses', basicCardClassesRouter);
router.use('/imageuploads', imageUploadsRouter);

module.exports = router;