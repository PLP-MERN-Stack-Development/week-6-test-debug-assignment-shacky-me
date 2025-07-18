const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI + "-test");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Bug API", () => {
  let id;

  it("should create a new bug", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({ title: "Test Bug" });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe("Test Bug");
    id = res.body._id;
  });

  it("should fetch all bugs", async () => {
    const res = await request(app).get("/api/bugs");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a bug", async () => {
    const res = await request(app)
      .put(`/api/bugs/${id}`)
      .send({ status: "in-progress" });
    expect(res.body.status).toBe("in-progress");
  });

  it("should delete a bug", async () => {
    const res = await request(app).delete(`/api/bugs/${id}`);
    expect(res.body.message).toBe("Bug deleted");
  });
});
