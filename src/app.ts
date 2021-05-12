import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import { router } from './routes';

const app = express();

app.use(express.json());
app.use('/api', router);

export {
  app,
};