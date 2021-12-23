import MongoMemoryServer from "mongodb-memory-server-core"
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { environment } from "../environment";

declare global {
  var signin: (id?: string) => string[];
}

let mongo: any;

jest.mock('../nats-wrapper');
jest.setTimeout(15000);

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(() => {
  mongo.stop();
  mongoose.connection.close();
});

global.signin = (id: string = new mongoose.Types.ObjectId().toHexString()) => {
  const payload = {
    id,
    email: "email@email.com"
  };

  const token = jwt.sign(payload, environment.jwt_key);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};