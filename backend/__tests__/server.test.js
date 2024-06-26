import request from "supertest";
import app, { server } from "../index.js";
import mongoose from "mongoose";

describe("Server Listening Test", () => {
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("GET / should return 200 OK", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
