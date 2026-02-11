import { Request, Response, NextFunction } from 'express';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY is not set');
}

// [CR] proč je middleware v utils?
const validateApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
};

export { validateApiKey };
