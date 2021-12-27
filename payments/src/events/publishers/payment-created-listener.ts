import { PaymentCreatedEvent, Publisher, Subjects } from "@vitoraatickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
  readonly subject = Subjects.PaymentCreated;
}