import { ExpirationCompleteEvent, Listener, OrderStatus, Subjects } from "@vitoraatickets/common";
import { Message } from "node-nats-streaming";
import { environment } from "../../environment";
import { Order } from "../../models/order";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
  readonly subject = Subjects.ExpirationComplete;
  queueGroupName = environment.queue_group_name;
  async onMessage (data: ExpirationCompleteEvent['data'], msg: Message) {
    const { orderId } = data;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Ticket not found');
    }

    order.set({ orderStatus: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }

}