import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

test('should have a route handler listening to api/payments for post request', async () => {
  const response = await request(app)
    .post('/api/payments')
    .send({})

  expect(response.status).not.toEqual(404);
});


test('should only be accessed if the user is signed in', async () => {
  await request(app)
    .post('/api/payments')
    .send({})
    .expect(401);
});

test('should returns status other than 401 if the user is signed in', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).not.toEqual(401);
});

test('should return an error if an invalid payment is provided', async () => {
  const cookie = global.signin();
  await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({
      token: '',
      orderId: 'orderid'
    })
    .expect(400);

  await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({
      token: 'token',
      orderId: ''
    })
    .expect(400);

  await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({})
    .expect(400);
});

test('should return an error if the order does not exist', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'token',
      orderId: new mongoose.Types.ObjectId(),
    })
    .expect(400);
});