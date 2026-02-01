const  express = require('express');
const router = express.Router();

router.get('/up', (req, res) => {
  res.status(200).send('OK');
});

module.exports = router;
