import { OrderStatus } from '@vitoraatickets/common';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

test('should have a route handler listening to api/orders for delete request', async () => {
  const response = await request(app)
    .delete('/api/orders/id')
    .send({})

  expect(response.status).not.toEqual(404);
});

test('should only be accessed if the user is signed in', async () => {
  await request(app)
    .delete('/api/orders/id')
    .send({})
    .expect(401);
});

test('should return status other than 401 if the user is signed in', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .delete('/api/orders/id')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).not.toEqual(401);
});

test('should return 404 if the order does not exist or not authorized', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .delete('/api/orders/id')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).toEqual(404);
});

test('should return error 404 if user try to delete order of another user', async () => {
  const user1 = global.signin();
  const user2 = global.signin();

  const ticket = Ticket.build({
    price: 10,
    title: 'Title 1'
  });
  await ticket.save();

  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  const response = await request(app)
    .delete(`/api/orders/${orderOne.id}`)
    .set('Cookie', user2)
    .send({})


  expect(response.status).toEqual(404);
});

test('should change order status of order to Cancelled', async () => {
  const user1 = global.signin();

  const ticket = Ticket.build({
    price: 10,
    title: 'Title 1'
  });
  await ticket.save();

  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  const response = await request(app)
    .delete(`/api/orders/${orderOne.id}`)
    .set('Cookie', user1)
    .send({})

  expect(response.status).toEqual(200);
  expect(response.body.id).toEqual(orderOne.id);
  expect(response.body.status).toEqual(OrderStatus.Cancelled);
});