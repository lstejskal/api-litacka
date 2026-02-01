const createError = require('http-errors');
const express = require('express');

const indexRouter = require('./src/index');
const cardsRouter = require('./src/cards');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/', indexRouter);
app.use('/cards', cardsRouter);

// not found handler
app.use((req, res, next) => {
    return res.status(401).json({ error: 'Not found' });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  return res
    .status(err.status || 500)
    .json({ error: res.locals.message, status: res.statusCode });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
