import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from '@vitoraatickets/common';
import { Message } from 'node-nats-streaming';
import { environment } from '../../environment';
export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
  readonly subject = Subjects.OrderCreated;
  queueGroupName = environment.queue_group_name;

  onMessage (data: OrderCreatedEvent['data'], msg: Message): void {
    throw new Error('Method not implemented.');
  }

}