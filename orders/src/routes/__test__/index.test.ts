import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

test('should have a route handler listening to api/orders for get request', async () => {
  const response = await request(app)
    .get('/api/orders')
    .send({})

  expect(response.status).not.toEqual(404);
});

test('should only be accessed if the user is signed in', async () => {
  await request(app)
    .get('/api/orders')
    .send({})
    .expect(401);
});

test('should returns status other than 401 if the user is signed in', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).not.toEqual(401);
});

test('should return the orders of the user', async () => {
  const cookie = global.signin();

  const ticket = Ticket.build({
    price: 10,
    title: 'Title 1'
  });
  await ticket.save();

  const ticket2 = Ticket.build({
    price: 10,
    title: 'Title 1'
  });
  await ticket2.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({
      ticketId: ticket2.id,
    })
    .expect(201);

  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(2);
});