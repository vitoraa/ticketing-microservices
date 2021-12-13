import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

test('should have a route handler listening to api/tickets for post request', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})

  expect(response.status).not.toEqual(404);
});

test('should only be accessed if the user is signed in', async () => {
  await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
});

test('should returns status other than 401 if the user is signed in', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).not.toEqual(401);
});

test('should return an error if an invalid title is provided', async () => {
  const cookie = global.signin();
  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      price: 10,
    })
    .expect(400);
});

test('should return an error if an invalid price is provided', async () => {
  const cookie = global.signin();
  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Title 1',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Title 2',
    })
    .expect(400);
});

test('should create a ticket with valid inputs', async () => {

  const cookie = global.signin();
  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Title 1',
      price: 10,
    })
    .expect(201);

  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});