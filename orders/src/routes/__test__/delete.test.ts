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