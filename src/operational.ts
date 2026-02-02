import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();

router.get('/up', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

export = router;
