const express = require('express');
const router = express.Router();

const { validateApiKey } = require('./utils/authentication');
const Litacka = require('./models/litacka');

const getCompositeStatus = (status1, status2) => {
  if (status1 === 200 && status2 === 200) {
    return 200;
  }
  if (status1 === 200) {
    return status2;
  }
  if (status2 === 200) {
    return status1;
  }
  return status1;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  return `${day}.${month}.${year}`;
}

router.get('/:cardNumber', validateApiKey, async (req, res, next) => {
  const { cardNumber } = req.params;

  const [cardValidity, cardState] = await Promise.all([
    Litacka.getValidity(cardNumber),
    Litacka.getState(cardNumber),
  ]);

  const compositeStatus = getCompositeStatus(cardValidity.status, cardState.status);

  if (compositeStatus !== 200) {
    return res.status(compositeStatus);
  }

  res.status(compositeStatus).json({
    validity_end: formatDate(cardValidity.data.validity_end),
    state_description: cardState.data.state_description,
  });
});

module.exports = router;
