import Queue from 'bull';
import { environment } from '../environment';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: environment.redis_host,
  },
});

expirationQueue.process(async (job) => {
  console.log(job.data.orderId);
});

export { expirationQueue };