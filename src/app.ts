import express, { Express, Request, Response, ErrorRequestHandler } from 'express';

import operationalRouter = require('./operational');
import cardsRouter = require('./cards');

const app: Express = express();

app.use(express.json());

app.use('/', operationalRouter);
app.use('/cards', cardsRouter);

// not found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // set locals, only providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res
    .status(err.status || 500)
    .json({ error: res.locals.message, status: res.statusCode });
};

app.use(errorHandler);

export = app;
