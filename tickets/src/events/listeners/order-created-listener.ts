import { Listener, Subjects, OrderCreatedEvent, NotFoundError } from "@vitoraatickets/common";
import { Message } from "node-nats-streaming";
import { environment } from "../../environment";
import { Ticket } from "../../models/ticket";

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

    msg.ack();
  }

}