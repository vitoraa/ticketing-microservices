import request from 'supertest';
import { app } from '../../app';

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