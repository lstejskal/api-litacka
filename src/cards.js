const express = require('express');
const router = express.Router();

const Litacka = require('./models/litacka');

const API_KEY = process.env.API_KEY || 'litacka';

const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

router.get('/:cardNumber/validity', authenticate, async (req, res, next) => {
  const { cardNumber } = req.params;

  const result = await Litacka.getValidity(cardNumber);

  res.status(result.status).json(result.data);
});

router.get('/:cardNumber/state', authenticate, async (req, res, next) => {
  const { cardNumber } = req.params;

  const result = await Litacka.getState(cardNumber);

  res.status(result.status).json(result.data);
});

module.exports = router;
