import { Request, Response, NextFunction } from 'express';
import { IAddStaffAdminTask, IAddStaffCourse, IResponse } from '../interfaces';
import { Admin_Task } from '../models/Admin_Task';
import { Course } from '../models/Course';
import { Staff_Admin_Task } from '../models/Staff_Admin_Task';
import { Staff_Community_Outreach } from '../models/Staff_Community_Outreach';
import { Staff_Course } from '../models/Staff_Course';
import { Staff_Research } from '../models/Staff_Research';
import { User } from '../models/User';
import { User_Type } from '../models/User_Type';

export default class StaffController {

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
     * Get all staff  
     *
     * @description returns a list of all staff 
     */
    getAll = async (req: Request, res: Response) => {
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let staff = await this.dbContext.User.findAll({
                where: {
                    Type_Id: 1
                }
            });

            response.data = staff;
            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }
}