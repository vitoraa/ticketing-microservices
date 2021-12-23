import request from 'supertest';
import { app } from '../../app';

test('should have a route handler listening to api/payments for post request', async () => {
  const response = await request(app)
    .post('/api/payments')
    .send({})

  expect(response.status).not.toEqual(404);
});