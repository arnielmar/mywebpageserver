import dotenv from 'dotenv';
import express from 'express';

import { router as apiRouter } from './router.js';

dotenv.config();
const {
  PORT: port = 5000,
} = process.env;

const app = express();

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin', '*',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use('/', apiRouter);

app.use((req, res, next) => { // eslint-disable-line
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => { // eslint-disable-line
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid json' });
  }

  return res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
