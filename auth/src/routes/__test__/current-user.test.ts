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