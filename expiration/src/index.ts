import 'express-async-errors';
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
  } catch (err) {
    console.log(err)
  }
}

start();

