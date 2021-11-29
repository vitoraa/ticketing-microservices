import MongoMemoryServer from "mongodb-memory-server-core"
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;

jest.setTimeout(15000);

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(() => {
  mongo.stop();
  mongoose.connection.close();
});

global.signin = async () => {
  const email = "email@email.com"
  const password = "password"

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};