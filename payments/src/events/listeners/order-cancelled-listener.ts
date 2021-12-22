import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from '@vitoraatickets/common';
import { Message } from 'node-nats-streaming';
import { environment } from '../../environment';
import { Order } from '../../models/order';

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = environment.queue_group_name;

  async onMessage (data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findById(data.id);

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();
  }

}