import request from 'supertest';
import { app } from '../../app';

test('should returns 200 and the current user on successful get current user', async () => {
  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(201);

  const cookie = authResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/current_user')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

  expect(response.body.currentUser.email).toEqual('email@email.com');
});