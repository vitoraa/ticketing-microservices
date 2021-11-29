import express from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler } from '@vitoraatickets/common';
import cookieSession from 'cookie-session';
import { environment } from './environment';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: environment.node_env !== 'test',
}));

app.all('*', async () => {
  throw new NotFoundError()
});

app.use(errorHandler);

export { app };
