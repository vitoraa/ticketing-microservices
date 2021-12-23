import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus } from '@vitoraatickets/common';

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
    .expect(404);
});

test('should return an error if the order does not belong the user who is requesting', async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    version: 0,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'token',
      orderId: order.id,
    })
    .expect(401);
});

test('should return an error if the order is cancelled', async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Cancelled,
    price: 10,
    version: 0,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(order.userId))
    .send({
      token: 'token',
      orderId: order.id,
    })
    .expect(400);
});