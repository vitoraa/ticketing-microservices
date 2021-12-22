import { Publisher, Subjects, ExpirationCompleteEvent } from "@vitoraatickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
  readonly subject = Subjects.ExpirationComplete;
}