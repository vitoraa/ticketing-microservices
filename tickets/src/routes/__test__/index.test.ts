import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asldkfj',
      price: 20,
    });
};

test('should return all tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  const ticketsResponse = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

  expect(ticketsResponse.body.length).toEqual(3);
});
