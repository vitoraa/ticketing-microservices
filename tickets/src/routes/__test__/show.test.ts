import request from 'supertest';
import { app } from '../../app';

test('should return 404 if the ticket is not found', async () => {
  await request(app)
    .get('/api/tickets/not-found')
    .send()
    .expect(404);
});