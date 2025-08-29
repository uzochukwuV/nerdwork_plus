import request from "supertest";
import { app } from "../../src/index.js";
import { describe, expect, it } from "@jest/globals";

describe("Auth Endpoints", () => {
  it("should sign up a new user", async () => {
    const res = await request(app).post("/auth/signup").send({
      email: "test@example.com",
      password: "password123",
      username: "tester",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
  });

  it("should login the user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
