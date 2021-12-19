import { Listener, Subjects, TicketCreatedEvent } from "@vitoraatickets/common";
import { Message } from "node-nats-streaming";
import { environment } from "../../environment";

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated;
  queueGroupName = environment.queue_group_name;
  onMessage (data: TicketCreatedEvent['data'], msg: Message): void { }

}