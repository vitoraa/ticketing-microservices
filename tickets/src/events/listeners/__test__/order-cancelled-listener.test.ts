import { OrderCancelledEvent, OrderStatus } from "@vitoraatickets/common";
import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const ticket = Ticket.build({
    price: 10,
    title: 'Title 1',
    userId: 'userId'
  });

  ticket.orderId = new mongoose.Types.ObjectId().toHexString();
  await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    ticket: {
      id: ticket.id
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
  expect(ticketUpdated!.orderId).toEqual(undefined);
});

test('should call msg.ack', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

test('publishes an event', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
