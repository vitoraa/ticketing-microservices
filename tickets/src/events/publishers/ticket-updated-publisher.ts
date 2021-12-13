import { Publisher, Subjects, TicketUpdatedEvent } from "@vitoraatickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  readonly subject = Subjects.TicketUpdated;
}