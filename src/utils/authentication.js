
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY is not set');
}

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

module.exports = { validateApiKey };