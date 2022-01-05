import request from 'supertest';
import { app } from '../../app';

test('should returns 200 and the current user on successful get current user', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/current_user')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

  expect(response.body.currentUser.email).toEqual('email@email.com');
});

test('should returns null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/current_user')
    .send({})
    .expect(200);

  expect(response.body.currentUser).toBe(null);
});