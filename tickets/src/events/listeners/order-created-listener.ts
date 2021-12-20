import { Listener, Subjects, OrderCreatedEvent, NotFoundError } from "@vitoraatickets/common";
import { Message } from "node-nats-streaming";
import { environment } from "../../environment";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
  readonly subject = Subjects.OrderCreated;
  queueGroupName = environment.queue_group_name;
  async onMessage (data: OrderCreatedEvent['data'], msg: Message) {
    const { id, ticket } = data;

    const ticketFound = await Ticket.findById(ticket.id);

    if (!ticketFound) {
      throw new NotFoundError();
    }

    ticketFound.set({ orderId: id });
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