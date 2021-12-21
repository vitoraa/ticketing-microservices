import { Listener, Subjects, OrderCancelledEvent, NotFoundError } from "@vitoraatickets/common";
import { Message } from "node-nats-streaming";
import { environment } from "../../environment";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = environment.queue_group_name;
  async onMessage (data: OrderCancelledEvent['data'], msg: Message) {
    const { ticket } = data;

    const ticketFound = await Ticket.findById(ticket.id);

    if (!ticketFound) {
      throw new NotFoundError();
    }

    ticketFound.set({ orderId: undefined });
    await ticketFound.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticketFound.id,
      price: ticketFound.price,
      title: ticketFound.title,
      userId: ticketFound.userId,
      orderId: ticketFound.orderId,
      version: ticketFound.version
    });

    msg.ack();
  }

}