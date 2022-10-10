import app from "../src/server"
import supertest from "supertest";

const request = supertest(app);


describe("course allocation integration tests", () => {
    test("test endpoint returns successfully", async () => {
        let result = await request.get("/test");
        expect(result.status).toBe(200);
    });
});