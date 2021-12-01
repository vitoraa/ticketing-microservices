import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

test('should return 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

test('should return the ticket if the ticket is found', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Title 1',
      price: 10,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual('Title 1');
  expect(ticketResponse.body.price).toEqual(10);
});