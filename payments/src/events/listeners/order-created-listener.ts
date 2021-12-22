import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from '@vitoraatickets/common';
import { Message } from 'node-nats-streaming';
import { environment } from '../../environment';
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
  readonly subject = Subjects.OrderCreated;
  queueGroupName = environment.queue_group_name;

  async onMessage (data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: OrderStatus.Created,
      userId: data.userId,
      version: data.version,
    })

    await order.save();
    msg.ack();
  }

}