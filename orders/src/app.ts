import express from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler, currentUser } from '@vitoraatickets/common';
import cookieSession from 'cookie-session';
import { environment } from './environment';
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: environment.node_env !== 'test',
}));

app.use(currentUser);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

app.all('*', async () => {
  throw new NotFoundError()
});

app.use(errorHandler);

export { app };
