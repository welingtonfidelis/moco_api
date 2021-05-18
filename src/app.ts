import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

export {
  app,
};