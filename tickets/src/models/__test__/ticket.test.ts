import { Ticket } from '../ticket'

test('should implement optimisitc concurrency control', async () => {
  const ticket = Ticket.build({
    title: 'Title 1',
    price: 10,
    userId: '123'
  });

  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 20 });

  await firstInstance!.save();
  await expect(secondInstance!.save()).rejects.toThrow();
});

test('should increment the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'Title 1',
    price: 10,
    userId: '123'
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
