import { Subjects } from "./subjects";
import { Stan } from "node-nats-streaming";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];

  constructor (private readonly client: Stan) { }

  publish (data: T['data']) {
    this.client.publish(this.subject, JSON.stringify(data), () => {
      console.log('Event published');
    });
  }
}