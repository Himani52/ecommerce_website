const request = require("supertest");
const app = require("../../app");

describe("Auth API Testing", () => {

  test("Register API should work", async () => {

    const response = await request(app)
      .post("/api/user/register")
      .send({
        firstname: "Himani",
        lastname: "Bansal",
        email: `himani${Date.now()}@gmail.com`,
        mobile: `98${Date.now().toString().slice(-8)}`,
        password: "123456"
      });

    console.log(response.body);

    expect(response.statusCode).toBe(200);

  });

});