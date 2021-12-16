import request from 'supertest';
import { app } from '../../app';

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