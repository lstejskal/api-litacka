import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();

import { validateApiKey } from './utils/authentication';
import Litacka = require('./models/litacka');

router.get('/:cardNumber', validateApiKey, async (req: Request, res: Response) => {
  const { cardNumber } = req.params as { cardNumber: string };

  const result = await Litacka.getValidityAndState(cardNumber);

  if (result.status !== 200) {
    res.status(result.status).send();
    return;
  }

  res.status(result.status).json(result.data);
});

export = router;
