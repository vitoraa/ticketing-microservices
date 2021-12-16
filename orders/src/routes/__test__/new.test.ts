import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

test('should have a route handler listening to api/orders for post request', async () => {
  const response = await request(app)
    .post('/api/orders')
    .send({})

  expect(response.status).not.toEqual(404);
});

test('should only be accessed if the user is signed in', async () => {
  await request(app)
    .post('/api/orders')
    .send({})
    .expect(401);
});

test('should returns status other than 401 if the user is signed in', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).not.toEqual(401);
});

test('should return an error if an invalid order is provided', async () => {
  const cookie = global.signin();
  await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({
      ticketId: '',
    })
    .expect(400);

  await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({})
    .expect(400);
});

test('should return an error if the ticket does not exist', async () => {
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({
      ticketId: new mongoose.Types.ObjectId(),
    })
    .expect(404);
});

test('should return an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    price: 10,
    title: 'Title 1'
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    status: OrderStatus.Complete,
    userId: 'user1',
    expiresAt: new Date()
  });
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(400);
});