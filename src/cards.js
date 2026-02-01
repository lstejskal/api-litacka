const express = require('express');
const router = express.Router();

const Litacka = require('./models/litacka');

router.get('/:cardNumber/validity', async (req, res, next) => {
  const { cardNumber } = req.params;

  const result = await Litacka.getValidity(cardNumber);

  res.status(result.status).json(result.data);
});

router.get('/:cardNumber/state', async (req, res, next) => {
  const { cardNumber } = req.params;

  const result = await Litacka.getState(cardNumber);

  res.status(result.status).json(result.data);
});

module.exports = router;
