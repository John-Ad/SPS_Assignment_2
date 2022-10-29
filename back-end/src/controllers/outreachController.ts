
import { Request, Response, NextFunction } from 'express';
import { IAddStaffAdminTask, IAddStaffCourse, IAddStaffResearch, IResponse } from '../interfaces';
import { Admin_Task } from '../models/Admin_Task';
import { Course } from '../models/Course';
import { Staff_Admin_Task } from '../models/Staff_Admin_Task';
import { Staff_Community_Outreach } from '../models/Staff_Community_Outreach';
import { Staff_Course } from '../models/Staff_Course';
import { User } from '../models/User';
import { User_Type } from '../models/User_Type';
import fs from "fs";

export default class OutreachController {

    private dbContext: {
        Admin_Task: typeof Admin_Task,
        Course: typeof Course,
        Staff_Admin_Task: typeof Staff_Admin_Task,
        Staff_Community_Outreach: typeof Staff_Community_Outreach,
        Staff_Course: typeof Staff_Course,
        User: typeof User,
        User_Type: typeof User_Type,
    };

    constructor(models: {
        Admin_Task: typeof Admin_Task,
        Course: typeof Course,
        Staff_Admin_Task: typeof Staff_Admin_Task,
        Staff_Community_Outreach: typeof Staff_Community_Outreach,
        Staff_Course: typeof Staff_Course,
        User: typeof User,
        User_Type: typeof User_Type,
    }) {
        this.dbContext = models;
    }


    /**
     * Get outreach for staff 
     *
     * @description returns a list of outreach to staff
     * @param staffId id of staff member
     */
    getAllocated = async (req: Request, res: Response) => {
        let staffId = req.params.staffId;
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let outreach = await this.dbContext.Staff_Community_Outreach.findAll({
                where: {
                    StaffId: staffId
                }
            });

            response.data = outreach;
            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Add outreach for staff 
     *
     * @description creates new outreach record
     * @param staffId id of staff member
     * @param name name of outreach
     * @param filePath file path of evidence
     */
    add = async (req: Request, res: Response) => {
        let data: IAddStaffResearch = req.body;

        let response: IResponse = { errorMessage: "", data: "" };
        try {
            const allocation = await this.dbContext.Staff_Community_Outreach.create({
                StaffId: data.staffId,
                Name: data.name,
                File_Path: data.filePath,
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
     * Delete outreach for staff 
     *
     * @description deletes record
     * @param outreachId id of outreach
     */
    deleteAllocation = async (req: Request, res: Response) => {
        let outreachId = req.params.outreachId;

        let response: IResponse = { errorMessage: "", data: "" };

        try {
            const outreach = await this.dbContext.Staff_Community_Outreach.findOne({
                where: {
                    Id: outreachId
                }
            });

            if (outreach === null) {
                response.errorMessage = "outreach not found";
                return res.status(404).json(response);
            }

            fs.unlinkSync(`./uploads/${outreach.File_Path}`);

            const deletedFromDb = await this.dbContext.Staff_Community_Outreach.destroy({
                where: {
                    Id: outreachId
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
     * Get all unapproved outreach  
     *
     * @description returns a list of unapproved outreach
     */
    getAllUnapproved = async (req: Request, res: Response) => {
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let outreach = await this.dbContext.Staff_Community_Outreach.findAll({
                where: {
                    IsApproved: false
                },
                include: [
                    { model: User, as: "Staff" },
                ]
            });

            response.data = outreach;
            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Approve outreach  
     *
     * @description sets status of outreach to approved 
     * @param outreachId id of outreach
     */
    Approve = async (req: Request, res: Response) => {
        let outreachId = req.params.outreachId;
        let response: IResponse = { errorMessage: "", data: "" };

        try {
            const record = await this.dbContext.Staff_Community_Outreach.findOne({
                where: {
                    Id: outreachId
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