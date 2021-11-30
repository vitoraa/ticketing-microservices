import request from 'supertest';
import { app } from '../../app';

test('should have a route handler listening to api/tickets for post request', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})

  expect(response.status).not.toEqual(404);
});

test('should only be accessed if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
});

test('should return an error if an invalid title is provided', async () => {

});

test('should return an error if an invalid price is provided', async () => {

});

test('should create a ticket with valid inputs', async () => {

});