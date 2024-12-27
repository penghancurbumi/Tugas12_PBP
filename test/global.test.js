const request = require("supertest");
const app = require("../index");
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();

beforeAll(async () => {
  await Prisma.$connect();
  await Prisma.iphone.deleteMany();
  await Prisma.oppo.deleteMany();
  await Prisma.vivo.deleteMany();
  await Prisma.xiomi.deleteMany();
  await Prisma.poco.deleteMany();
});

afterAll(async () => {
  await Prisma.$disconnect();
});

describe("brand API Endpoints", () => {
  const brand = "iphone";
  let id;

  test("GET /iphone - Read brand Data", async () => {
    const response = await request(app).get("/iphone");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("brand");
  });
  test("GET /oppo - Read brand Data", async () => {
    const response = await request(app).get("/oppo");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("brand");
  });
  test("GET /vivo - Read brand Data", async () => {
    const response = await request(app).get("/vivo");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("brand");
  });
  test("GET /xiomi - Read brand Data", async () => {
    const response = await request(app).get("/xiomi");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("brand");
  });
  test("GET /poco - Read brand Data", async () => {
    const response = await request(app).get("/poco");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("brand");
  });

  test("POST /jenis/:brand - Create handphone Data", async () => {
    const response = await request(app).post(`/jenis/${brand}`).send({
      nama: "iphone",
      seri:"iphone 12",
      harga: "8000000",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("insertphone");
    id = response.body.insertphone.id;
  });

  test("PUT /jenis/:brand/:id - Edit handphone Data", async () => {
    const response = await request(app).put(`/jenis/${brand}/${id}`).send({
      nama: "iphone",
      seri:"iphone 12",
      harga: "8000000",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("updatephone");
  });

  test("DELETE /jenis/:brand/:id - Menghapus Data handphone", async () => {
    const response = await request(app).delete(`/jenis/${brand}/${id}`);

    expect(response.statusCode).toBe(202);
    expect(response.body).toHaveProperty("message");
  });
});