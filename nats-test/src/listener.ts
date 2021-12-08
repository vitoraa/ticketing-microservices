import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();


const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

const options = stan.subscriptionOptions().setManualAckMode(true);

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const subscription = stan.subscribe('ticket:created', 'listenerQueueGroup', options);

  subscription.on('message', (msg: Message) => {
    const data = JSON.parse(msg.getData() as string);
    console.log(`Received a message #${msg.getSequence()}, with data ${data}`);
    msg.ack();
  });
});