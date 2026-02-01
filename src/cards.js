const express = require('express');
const router = express.Router();

const { validateApiKey } = require('./utils/authentication');
const Litacka = require('./models/litacka');

router.get('/:cardNumber', validateApiKey, async (req, res, next) => {
  const { cardNumber } = req.params;

  const result = await Litacka.getValidityAndState(cardNumber);

  if (result.status !== 200) {
    return res.status(result.status);
  }

  res.status(result.status).json(result.data);
});

module.exports = router;
