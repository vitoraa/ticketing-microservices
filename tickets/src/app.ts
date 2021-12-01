import express from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler, currentUser } from '@vitoraatickets/common';
import cookieSession from 'cookie-session';
import { environment } from './environment';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: environment.node_env !== 'test',
}));

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async () => {
  throw new NotFoundError()
});

app.use(errorHandler);

export { app };
