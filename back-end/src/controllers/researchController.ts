
import { Request, Response, NextFunction } from 'express';
import { IAddStaffAdminTask, IAddStaffCourse, IAddStaffResearch, IResponse } from '../interfaces';
import { Admin_Task } from '../models/Admin_Task';
import { Course } from '../models/Course';
import { Staff_Admin_Task } from '../models/Staff_Admin_Task';
import { Staff_Community_Outreach } from '../models/Staff_Community_Outreach';
import { Staff_Course } from '../models/Staff_Course';
import { Staff_Research } from '../models/Staff_Research';
import { User } from '../models/User';
import { User_Type } from '../models/User_Type';
import fs from "fs";

export default class ResearchController {

    private dbContext: {
        Admin_Task: typeof Admin_Task,
        Course: typeof Course,
        Staff_Admin_Task: typeof Staff_Admin_Task,
        Staff_Community_Outreach: typeof Staff_Community_Outreach,
        Staff_Course: typeof Staff_Course,
        Staff_Research: typeof Staff_Research,
        User: typeof User,
        User_Type: typeof User_Type,
    };

    constructor(models: {
        Admin_Task: typeof Admin_Task,
        Course: typeof Course,
        Staff_Admin_Task: typeof Staff_Admin_Task,
        Staff_Community_Outreach: typeof Staff_Community_Outreach,
        Staff_Course: typeof Staff_Course,
        Staff_Research: typeof Staff_Research,
        User: typeof User,
        User_Type: typeof User_Type,
    }) {
        this.dbContext = models;
    }


    /**
     * Get research for staff 
     *
     * @description returns a list of research to staff
     * @param staffId id of staff member
     */
    getAllocated = async (req: Request, res: Response) => {
        let staffId = req.params.staffId;
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let research = await this.dbContext.Staff_Research.findAll({
                where: {
                    StaffId: staffId
                }
            });

            response.data = research;
            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Add research for staff 
     *
     * @description creates new research record
     * @param staffId id of staff member
     * @param name name of research
     * @param filePath file path of evidence
     */
    add = async (req: Request, res: Response) => {
        let data: IAddStaffResearch = req.body;

        let response: IResponse = { errorMessage: "", data: "" };
        try {
            const allocation = await this.dbContext.Staff_Research.create({
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
     * Delete research for staff 
     *
     * @description deletes record
     * @param researchId id of research
     */
    deleteAllocation = async (req: Request, res: Response) => {
        let researchId = req.params.researchId;

        let response: IResponse = { errorMessage: "", data: "" };

        try {
            const research = await this.dbContext.Staff_Research.findOne({
                where: {
                    Id: researchId
                }
            });

            if (research === null) {
                response.errorMessage = "research not found";
                return res.status(404).json(response);
            }

            fs.unlinkSync(`./uploads/${research.File_Path}`);

            const deletedFromDb = await this.dbContext.Staff_Research.destroy({
                where: {
                    Id: researchId
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
     * Get all unapproved research  
     *
     * @description returns a list of unapproved research
     */
    getAllUnapproved = async (req: Request, res: Response) => {
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let courses = await this.dbContext.Staff_Research.findAll({
                where: {
                    IsApproved: false
                },
                include: [
                    { model: User, as: "Staff" },
                ]
            });

            response.data = courses;
            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Approve research  
     *
     * @description sets status of research to approved 
     * @param researchId id of research
     */
    Approve = async (req: Request, res: Response) => {
        let researchId = req.params.researchId;
        let response: IResponse = { errorMessage: "", data: "" };

        try {
            const record = await this.dbContext.Staff_Research.findOne({
                where: {
                    Id: researchId
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