import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'tronvox-api'
  });
});

app.use('/api', routes);

app.use(errorHandler as express.ErrorRequestHandler);

export default app;
