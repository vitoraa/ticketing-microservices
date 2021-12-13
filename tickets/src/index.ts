import 'express-async-errors';
import mongoose from 'mongoose'
import { app } from './app';
import { environment } from './environment';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  try {
    await natsWrapper.connect(environment.nats_cluster_id, environment.nats_client_id, environment.nats_url);
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

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

