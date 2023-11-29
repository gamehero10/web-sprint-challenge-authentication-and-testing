const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');




// Write your tests here
test('sanity', () => {
  expect(true).toBe(true);
})


 /*describe("/register endpoint", () => {
  const noPassword = {id: 3, username: 'best', password: null};
   beforeEach(async () => {
     await db("users").truncate();
   });
   test("Registers the new user", async () => {
     const response = await request(server)
       .post("/api/auth/register")
       .send(UserA);
     expect(response.body).toHaveProperty("id");
     expect(response.body).toHaveProperty("username");
     expect(response.body).toHaveProperty("password");
   });
   test("Fails with a missing password", async () => {
     const response = await request(server)
       .post("/api/auth/register")
       .send(noPassword);
     expect(response.body).toBe("username and password required");
   });
 });


 describe("/login endpoint", () => {
   beforeEach(async () => {
     await db("users").truncate();
   });
   test("Logs in with registered user", async () => {
     const response = await request(server).post("/api/auth/login").send(UserA);
     expect(response.body).toHaveProperty("message");
     expect(response.body).toHaveProperty("token");
   });
  test("Will not log in an unregistered user", async () => {
     const response = await request(server).post("/api/auth/login").send(UserB);
     expect(response.body).toBe("invalid credentials");
   });
 });

 describe("/jokes endpoint", () => {
   beforeEach(async () => {
     await db("users").truncate();
     await request(server).post("/api/auth/register").send(UserA);
   });
   test("gives 200 status on success", async () => {
     const {
       body: { token },
    } = await request(server).post("/api/auth/login").send(UserA);
     const res = await request(server)
       .get("/api/jokes")
       .set("Authorization", token);
     expect(res.status).toBe(200);
   });
   test("requires token", async () => {
     const response = await request(server).get("/api/jokes");
     expect(response.body).toBe("token required");
   });
 }); */