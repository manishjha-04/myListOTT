import request from "supertest";
import app from "../index";
import mongoose from "mongoose";
import { connectRedis, disconnectRedis } from "../redis/config"; // Adjust the path as needed

describe("My List API", () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await connectRedis();
    server = app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await disconnectRedis();
    server.close();
  });

  let userId = "user001";
  let itemId = "show001";

  test("should add an item to the list", async () => {
    const response = await request(app)
      .post("/api/mylist/add")
      .send({ userId, itemId });
    expect(response.status).toBe(200);
  });

  test("should remove an item from the list", async () => {
    await request(app).post("/api/mylist/add").send({ userId, itemId });
    const response = await request(app)
      .post("/api/mylist/remove")
      .send({ userId, itemId });
    expect(response.status).toBe(200);
    expect(response.body).not.toContain(itemId);
  });

  test("should list items in the list", async () => {
    await request(app).post("/api/mylist/add").send({ userId, itemId });
    const response = await request(app)
      .get(`/api/mylist/list/${userId}`);
    expect(response.status).toBe(200);
  });
});
