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

test('should returns 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email',
      password: 'pas',
    })
    .expect(400);
});

test('should returns 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'email@email' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);
});

test('should disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(400);
});

test('should set a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});