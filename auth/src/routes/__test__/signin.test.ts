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

test('should returns 400 if email not exist', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(400);
});

test('should returns 400 when incorrect password is supplied', async () => {
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
      password: 'password_wrong',
    })
    .expect(400);
});

test('should set a cookie after successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'email@email.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
