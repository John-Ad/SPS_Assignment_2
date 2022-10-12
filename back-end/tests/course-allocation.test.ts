import app from "../src/server"
import supertest from "supertest";
import connection from "./testDb";
import { initModels } from "../src/models/init-models";
import { Op } from "sequelize";
import { IAddStaffCourse } from "../src/interfaces";
import { doesNotMatch } from "assert";

const request = supertest(app);

let models = initModels(connection);

const initDb = async () => {
    try {
        await models.User.destroy({ where: { Id: 1 } });
        await models.Course.destroy({
            where: {
                Id: {
                    [Op.lt]: 4
                }
            }
        });

        await models.User.create({
            Id: 1,
            Email: "staffEmail",
            First_Name: "staff",
            Last_Name: "stafferson",
            Password: "pw",
            Type_Id: 1
        });

        await models.Course.bulkCreate([
            {
                Id: 1,
                Name: "SPS611S"
            },
            {
                Id: 2,
                Name: "DSA611S"
            },
            {
                Id: 3,
                Name: "DTA611S"
            },
        ]);

        await models.Staff_Course.create({
            CourseId: 1,
            StaffId: 1
        });
        await models.Staff_Course.create({
            CourseId: 3,
            StaffId: 1
        });
    } catch (err) {
        console.log((err as Error).message);
        console.log((err as Error).name);
    }

}

describe("course allocation integration tests", () => {
    beforeAll(() => {
        return initDb();
    });

    test("test endpoint returns successfully", async () => {
        let result = await request.get("/test");
        expect(result.status).toBe(200);
    });

    test("Get all courses for staff valid", async () => {
        let result = await request.get("/staff/1/courses");
        expect(result.status).toBe(200);
    });

    test("Add staff course valid", async () => {
        let data: IAddStaffCourse = {
            courseId: 2,
            staffId: 1
        }
        let result = await request.post("/staff/1/courses").send(data);
        expect(result.status).toBe(200);
    });

    test("Delete staff course valid", async () => {
        let result = await request.delete("/staff/1/courses/1");
        expect(result.status).toBe(200);
    });

    test("Approve staff course valid", async () => {
        let data: IAddStaffCourse = {
            courseId: 3,
            staffId: 1
        }
        let result = await request.post("/staff/1/courses/approve").send(data);
        expect(result.status).toBe(200);
    });

    test("Get all unapproved courses for staff valid", async () => {
        let result = await request.get("/allocations/unapproved");
        expect(result.status).toBe(200);
    });
});