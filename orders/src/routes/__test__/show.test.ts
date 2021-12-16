import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

test('should have a route handler listening to api/orders for get request', async () => {
  const response = await request(app)
    .get('/api/orders/id')
    .send({})

  expect(response.status).not.toEqual(404);
});