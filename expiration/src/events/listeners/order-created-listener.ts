import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from '@vitoraatickets/common';
import { Message } from 'node-nats-streaming';
import { environment } from '../../environment';
import { expirationQueue } from '../../queue/expiration-queue';
export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
  readonly subject = Subjects.OrderCreated;
  queueGroupName = environment.queue_group_name;

  async onMessage (data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    await expirationQueue.add({ orderId: data.id }, { delay });

    msg.ack();
  }

}