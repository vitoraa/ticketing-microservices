import 'express-async-errors';
import mongoose from 'mongoose'
import { app } from './app';
import { environment } from './environment';
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  console.log('Starting....');
  try {
    await natsWrapper.connect(environment.nats_cluster_id, environment.nats_client_id, environment.nats_url);
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(environment.mongo_uri);
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log('Server started on port 3000!');
  });
}

start();

