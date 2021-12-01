import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

test('should return 404 if the id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(404);
});

test('should return 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send()
    .expect(401);
});