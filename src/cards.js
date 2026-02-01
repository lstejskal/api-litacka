var express = require('express');
var router = express.Router();

router.get('/:cardNumber/validity', (req, res, next) => {
  res.send('TODO');
});

router.get('/:cardNumber/state', (req, res, next) => {
  res.send('TODO');
});

module.exports = router;
