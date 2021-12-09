import { Message, Stan } from "node-nats-streaming";

export abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage (data: any, msg: Message): void;
  protected ackWait = 5 * 1000;

  constructor (private readonly client: Stan) {

  }

  subscriptionOptions () {
    return this.client.subscriptionOptions().setDeliverAllAvailable().setManualAckMode(true).setAckWait(this.ackWait).setDurableName(this.queueGroupName);
  }

  listen () {
    const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());

    subscription.on('message', (msg: Message) => {
      console.log(`Received a message #${msg.getSequence()}`);
      const data = this.parseMessage(msg);
      console.log(`Parsed message: ${data}`);
      this.onMessage(data, msg);
    });
  }

  parseMessage (msg: Message) {
    const data = msg.getData();
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
  }
}