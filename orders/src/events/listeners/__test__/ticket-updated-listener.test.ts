import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedEvent } from '@vitoraatickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    title: 'Title 1'
  });

  await ticket.save();

  const data: TicketUpdatedEvent['data'] = {
    version: ticket.version + 1,
    id: ticket.id,
    price: 20,
    title: 'Title 20',
    userId: 'userid'
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

  const ticketFound = await Ticket.findById(ticket.id);

  expect(ticketFound).toBeDefined();
  expect(ticketFound!.title).toEqual(data.title);
  expect(ticketFound!.price).toEqual(data.price);
  expect(ticketFound!.version).toEqual(data.version);
});

test('should call msg.ack', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});