import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

test('should have a route handler listening to api/orders for get request', async () => {
  const response = await request(app)
    .get('/api/orders/id')
    .send({})

  expect(response.status).not.toEqual(404);
});

test('should only be accessed if the user is signed in', async () => {
  await request(app)
    .get('/api/orders/id')
    .send({})
    .expect(401);
});

test('should returns status other than 401 if the user is signed in', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .get('/api/orders/id')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).not.toEqual(401);
});

test('should return 404 if the order does not exist or not authorized', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .get('/api/orders/id')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).toEqual(404);
});

test('should return the order of the user', async () => {
  const user1 = global.signin();
  const user2 = global.signin();

  const ticket = Ticket.build({
    price: 10,
    title: 'Title 1'
  });
  await ticket.save();

  const ticket2 = Ticket.build({
    price: 20,
    title: 'Title 2'
  });
  await ticket2.save();

  const ticket3 = Ticket.build({
    price: 30,
    title: 'Title 3'
  });
  await ticket3.save();

  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({
      ticketId: ticket2.id,
    })
    .expect(201);

  await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({
      ticketId: ticket3.id,
    })
    .expect(201);


  const response = await request(app)
    .get(`/api/orders/${orderOne.id}`)
    .set('Cookie', user1)
    .send({})

  expect(response.status).toEqual(200);
  expect(response.body.id).toEqual(orderOne.id);
  expect(response.body.ticket.title).toEqual('Title 1');
  expect(response.body.ticket.price).toEqual(10);
});