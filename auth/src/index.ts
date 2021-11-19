import 'express-async-errors';
import mongoose from 'mongoose'
import { app } from './app';

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log('Server started on port 3000!');
  });
}

start();

