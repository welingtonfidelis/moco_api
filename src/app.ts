import express from 'express';

import './database/connection';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use('/api', router);

export {
  app,
};