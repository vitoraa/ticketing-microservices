import { Publisher, Subjects, TicketCreatedEvent } from "@vitoraatickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated;
}