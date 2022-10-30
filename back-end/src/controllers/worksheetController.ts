
import { Request, Response, NextFunction } from 'express';
import { IAddStaffAdminTask, IAddStaffCourse, IAddStaffResearch, IResponse } from '../interfaces';
import { Admin_Task } from '../models/Admin_Task';
import { Course } from '../models/Course';
import { Staff_Admin_Task } from '../models/Staff_Admin_Task';
import { Staff_Course } from '../models/Staff_Course';
import { User } from '../models/User';
import { User_Type } from '../models/User_Type';
import { Workload_Sheet } from '../models/Workload_Sheet';

export default class WorksheetController {

    private dbContext: {
        Admin_Task: typeof Admin_Task,
        Course: typeof Course,
        Staff_Admin_Task: typeof Staff_Admin_Task,
        Staff_Course: typeof Staff_Course,
        User: typeof User,
        User_Type: typeof User_Type,
        Workload_Sheet: typeof Workload_Sheet,
    };

    constructor(models: {
        Admin_Task: typeof Admin_Task,
        Course: typeof Course,
        Staff_Admin_Task: typeof Staff_Admin_Task,
        Staff_Course: typeof Staff_Course,
        User: typeof User,
        User_Type: typeof User_Type,
        Workload_Sheet: typeof Workload_Sheet,
    }) {
        this.dbContext = models;
    }


    /**
     * Get sheets for staff 
     *
     * @description returns a list of sheets to staff
     * @param staffId id of staff member
     */
    getAllocated = async (req: Request, res: Response) => {
        let staffId = req.params.staffId;
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let result = await this.dbContext.Workload_Sheet.findAll({
                where: {
                    StaffId: staffId
                }
            });

            response.data = result;
            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Add sheets for staff 
     *
     * @description creates new sheets record
     * @param staffId id of staff member
     * @param name name of sheets
     */
    add = async (req: Request, res: Response) => {
        let data: IAddStaffResearch = req.body;

        let response: IResponse = { errorMessage: "", data: "" };
        try {
            const allocation = await this.dbContext.Workload_Sheet.create({
                StaffId: data.staffId,
                Name: data.name,
                File_Path: "workload_sheet.pdf",
                IsApproved: false
            });

            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Delete sheets for staff 
     *
     * @description deletes record
     * @param sheetsId id of sheet
     */
    deleteAllocation = async (req: Request, res: Response) => {
        let sheetId = req.params.sheetId;

        let response: IResponse = { errorMessage: "", data: "" };

        try {
            const sheets = await this.dbContext.Workload_Sheet.findOne({
                where: {
                    Id: sheetId
                }
            });

            if (sheets === null) {
                response.errorMessage = "sheet not found";
                return res.status(404).json(response);
            }
            const deletedFromDb = await this.dbContext.Workload_Sheet.destroy({
                where: {
                    Id: sheetId
                }
            })

            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Get all unapproved sheets  
     *
     * @description returns a list of unapproved sheets
     */
    getAllUnapproved = async (req: Request, res: Response) => {
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let sheets = await this.dbContext.Workload_Sheet.findAll({
                where: {
                    IsApproved: false
                },
                include: [
                    { model: User, as: "Staff" },
                ]
            });

            response.data = sheets;
            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Approve sheet
     *
     * @description sets status of sheet to approved 
     * @param sheetsId id of sheet
     */
    Approve = async (req: Request, res: Response) => {
        let sheetId = req.params.sheetId;
        let response: IResponse = { errorMessage: "", data: "" };

        try {
            const record = await this.dbContext.Workload_Sheet.findOne({
                where: {
                    Id: sheetId
                }
            });

            if (!record) {
                response.errorMessage = "Not found"
                return res.status(404).json(response);
            }

            record.IsApproved = true;
            await record.save();

            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }
}