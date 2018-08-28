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

router.use('*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

router.all('*', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  if (req.method !== 'GET') {
    // check for admin role for anything except for GET
    if (!req.user.getIsAdmin()) {
      return res.status(403).json({ error: 'Non admin forbidden' })
    }
  }
  next();
});

router.use('/teams', teamsRouter);
router.use('/characters', charactersRouter);
router.use('/specialcards', specialCardsRouter);
router.use('/basiccardclasses', basicCardClassesRouter);
router.use('/imageuploads', imageUploadsRouter);

module.exports = router;