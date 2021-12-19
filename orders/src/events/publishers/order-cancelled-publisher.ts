import { OrderCancelledEvent, Publisher, Subjects } from "@vitoraatickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
  readonly subject = Subjects.OrderCancelled;
}