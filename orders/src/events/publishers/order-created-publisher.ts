import { OrderCreatedEvent, Publisher, Subjects } from "@vitoraatickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
  readonly subject = Subjects.OrderCreated;
}