import { Listener, Subjects, TicketCreatedEvent } from "@vitoraatickets/common";
import { Message } from "node-nats-streaming";
import { environment } from "../../environment";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated;
  queueGroupName = environment.queue_group_name;
  async onMessage (data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id, title, price
    });
    await ticket.save();

    msg.ack();
  }

}