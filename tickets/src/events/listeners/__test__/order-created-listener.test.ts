import { OrderCreatedEvent, OrderStatus } from "@vitoraatickets/common";
import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    price: 10,
    title: 'Title 1',
    userId: 'userId'
  });

  await ticket.save();

  const data: OrderCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: new Date().toISOString(),
    status: OrderStatus.Created,
    ticket: {
      id: ticket.id,
      price: 10
    }
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { listener, data, msg, ticket };
};

test('should update the ticket', async () => {
  const { listener, data, msg, ticket } = await setup();
  await listener.onMessage(data, msg);

  const ticketUpdated = await Ticket.findById(ticket.id);

  expect(ticketUpdated).toBeDefined();
  expect(ticketUpdated!.orderId).toEqual(data.id);
});