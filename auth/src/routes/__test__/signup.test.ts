import request from 'supertest';
import { app } from '../../app';

test('should returns 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(201);
});

test('should returns 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email',
      password: 'password',
    })
    .expect(400);
});