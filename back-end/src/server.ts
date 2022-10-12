import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import CourseController from './controllers/courseController';
import connection from './database';
import { initModels } from './models/init-models';
import { User_Type } from './models/User_Type';

const app: Express = express();

//-------------------------------
//      SETUP ACCESS CONTROL
//-------------------------------

app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*");      //allows requests from any domain
    inResponse.header("Access-Control-Allow-Methods", "*");   //allows these methods
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");   //allows these headers
    inNext();
});

app.use(express.json());
app.use(express.urlencoded());

connection.authenticate().then(() => { console.log("connection active") }).catch((err) => { console.log(err) });
connection.sync().then(() => { console.log("connection synced") });
let models = initModels(connection);

const courseController = new CourseController(models);

//-------------------------------
//      TEST ENDPOINT     
//-------------------------------
app.get("/test", (req, res) => {
    console.log("ere");
    res.send("hello world");
});

//-------------------------------------------
//      GET ALL USER TYPES      
//-------------------------------------------
app.get("/users/types", async (req, res) => {
    try {
        console.log("here");
        const userTypes: any = await models.User_Type.findAll();
        console.log(userTypes.length);
        return res.status(200).json(userTypes);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
});

//-------------------------------------------
//      COURSE ENDPOINTS      
//-------------------------------------------

//----   GET ALL COURSES   ----
app.get("/courses/", courseController.getAllCourses);

//----   GET STAFF COURSES   ----
app.get("/staff/:staffId/courses", courseController.getCourseAllocationsForStaff);

//----   ADD STAFF COURSE   ----
app.post("/staff/:staffId/courses", courseController.addCourseAllocationForStaff);

//----   DELETE STAFF COURSE   ----
app.delete("/staff/:staffId/courses/:courseId", courseController.deleteCourseAllocationForStaff);

//----   APPROVE STAFF COURSE   ----
app.post("/staff/:staffId/courses/approve", courseController.ApproveCourseAllocationForStaff);

//----   GET ALL UNAPPROVED STAFF COURSES   ----
app.get("/allocations/unapproved", courseController.getUnapprovedCourseAllocations);


//-------------------------------
//      EXPORT SERVER     
//-------------------------------
export default app;