import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { v4 } from "uuid";
import AdminTasksController from './controllers/adminTasksController';
import CourseController from './controllers/courseController';
import OutreachController from './controllers/outreachController';
import ResearchController from './controllers/researchController';
import StaffController from './controllers/staffController';
import WorksheetController from './controllers/worksheetController';
import connection from './database';
import { IResponse } from './interfaces';
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
const staffController = new StaffController(models);
const adminTasksController = new AdminTasksController(models);
const researchController = new ResearchController(models);
const outreachController = new OutreachController(models);
const workloadController = new WorksheetController(models);

//-------------------------------
//      SETUP MULTER     
//-------------------------------
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `${v4()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

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


//-------------------------------------------
//      STAFF ENDPOINTS      
//-------------------------------------------

//----   GET ALL STAFF   ----
app.get("/staff/", staffController.getAll);


//-------------------------------------------
//      ADMINISTRATIVE TASKS ENDPOINTS      
//-------------------------------------------

//----   GET ALL ADMIN TASKS   ----
app.get("/admin-tasks/", adminTasksController.getAll);

//----   GET ALL ADMIN TASKS FOR STAFF   ----
app.get("/staff/:staffId/admin-tasks/", adminTasksController.getAllocated);

//----   ADD ADMIN TASK FOR STAFF   ----
app.post("/staff/admin-tasks/", adminTasksController.addllocation);

//----   DELETE ADMIN TASK FOR STAFF   ----
app.delete("/staff/:staffId/admin-tasks/:taskId", adminTasksController.deleteAllocation);

//-------------------------------------------
//      RESEARCH ENDPOINTS      
//-------------------------------------------

//----   GET STAFF RESEARCH   ----
app.get("/staff/:staffId/research", researchController.getAllocated);

//----   ADD STAFF RESEARCH   ----
app.post("/research", researchController.add);

//----   DELETE RESEARCH   ----
app.delete("/research/:researchId", researchController.deleteAllocation);

//----   APPROVE RESEARCH   ----
app.get("/research/:researchId/approve", researchController.Approve);

//----   GET ALL UNAPPROVED RESEARCH   ----
app.get("/research/unapproved", researchController.getAllUnapproved);

//-------------------------------------------
//      OUTREACH ENDPOINTS      
//-------------------------------------------

//----   GET STAFF OUTREACH   ----
app.get("/staff/:staffId/outreach", outreachController.getAllocated);

//----   ADD STAFF OUTREACH   ----
app.post("/outreach", outreachController.add);

//----   DELETE OUTREACH   ----
app.delete("/outreach/:outreachId", outreachController.deleteAllocation);

//----   APPROVE OUTREACH   ----
app.get("/outreach/:outreachId/approve", outreachController.Approve);

//----   GET ALL UNAPPROVED OUTREACH   ----
app.get("/outreach/unapproved", outreachController.getAllUnapproved);

//-------------------------------------------
//      WORKLOAD SHEET ENDPOINTS      
//-------------------------------------------

//----   GET STAFF WORKLOAD-SHEETS   ----
app.get("/staff/:staffId/workload-sheets", workloadController.getAllocated);

//----   ADD STAFF WORKLOAD-SHEETS   ----
app.post("/workload-sheets", workloadController.add);

//----   DELETE WORKLOAD-SHEETS   ----
app.delete("/workload-sheets/:sheetId", workloadController.deleteAllocation);

//----   APPROVE WORKLOAD-SHEETS   ----
app.get("/workload-sheets/:sheetId/approve", workloadController.Approve);

//----   GET ALL UNAPPROVED WORKLOAD-SHEETS   ----
app.get("/workload-sheets/unapproved", workloadController.getAllUnapproved);

//-------------------------------------------
//      FILE HANDLING      
//-------------------------------------------

app.post("/upload", upload.single("file"), (req, res) => {
    let response: IResponse = { errorMessage: "", data: "" };
    if (!req.file) {
        response.errorMessage = "no file was provided";
        return res.status(400).json(response);
    }
    response.data = { filePath: req.file.filename };
    return res.status(200).json(response);
});

app.get("/download/:path", (req, res) => {
    let path = req.params.path;
    const file = `${__dirname}/../uploads/${path}`;
    res.download(file);
});

//-------------------------------
//      EXPORT SERVER     
//-------------------------------
export default app;