import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

test('should return 404 if the id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send()
    .expect(404);
});