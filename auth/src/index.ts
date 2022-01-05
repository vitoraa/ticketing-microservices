import 'express-async-errors';
import mongoose from 'mongoose'
import { app } from './app';
import { environment } from './environment';

const start = async () => {
  console.log('Starting up....');
  try {
    await mongoose.connect(environment.mongo_uri);
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log('Server started on port 3000!');
  });
}

start();

