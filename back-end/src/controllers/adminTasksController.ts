
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

export default class AdminTasksController {

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
     * Get all admin tasks  
     *
     * @description returns a list of all admin tasks 
     */
    getAll = async (req: Request, res: Response) => {
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let adminTasks = await this.dbContext.Admin_Task.findAll();

            response.data = adminTasks;
            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Get admin tasks for staff 
     *
     * @description returns a list of admin tasks to staff
     * @param staffId id of staff member
     */
    getAllocated = async (req: Request, res: Response) => {
        let staffId = req.params.staffId;
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let tasks = await this.dbContext.Staff_Admin_Task.findAll({
                where: {
                    StaffId: staffId
                },
                include: {
                    model: Admin_Task, as: "AdminTask"
                }
            });

            response.data = tasks;
            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Add task allocation for staff 
     *
     * @description creates new unapproved allocation record
     * @param staffId id of staff member
     * @param taskId id of task to allocate
     */
    addllocation = async (req: Request, res: Response) => {
        let data: IAddStaffAdminTask = req.body;

        let response: IResponse = { errorMessage: "", data: "" };
        try {
            const allocation = await this.dbContext.Staff_Admin_Task.create({
                StaffId: data.staffId,
                AdminTaskId: data.taskId,
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
     * Delete task allocation for staff 
     *
     * @description deletes allocation record
     * @param staffId id of staff member
     * @param taskId id of task to deallocate
     */
    deleteAllocation = async (req: Request, res: Response) => {
        let staffId = req.params.staffId;
        let taskId = req.params.taskId;

        let response: IResponse = { errorMessage: "", data: "" };

        try {
            const allocation = await this.dbContext.Staff_Admin_Task.destroy({
                where: {
                    StaffId: staffId,
                    AdminTaskId: taskId
                }
            })

            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }
}