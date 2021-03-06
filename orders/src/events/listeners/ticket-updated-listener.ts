import { Listener, Subjects, TicketUpdatedEvent } from "@vitoraatickets/common";
import { Message } from "node-nats-streaming";
import { environment } from "../../environment";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = environment.queue_group_name;
  async onMessage (data: TicketUpdatedEvent['data'], msg: Message) {
    const { title, price } = data;
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.title = title;
    ticket.price = price;
    await ticket.save();

    msg.ack();
  }

}