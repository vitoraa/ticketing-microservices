import request from 'supertest';
import { app } from '../../app';

test('should returns 200 on successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(200);
});