
import { Request, Response, NextFunction } from 'express';
import { IAddStaffCourse, IResponse } from '../interfaces';
import { Course } from '../models/Course';
import { Staff_Course } from '../models/Staff_Course';
import { User } from '../models/User';
import { User_Type } from '../models/User_Type';

export default class CourseController {

    private dbContext: {
        Course: typeof Course;
        Staff_Course: typeof Staff_Course;
        User: typeof User;
        User_Type: typeof User_Type;
    };

    constructor(models: {
        Course: typeof Course;
        Staff_Course: typeof Staff_Course;
        User: typeof User;
        User_Type: typeof User_Type;
    }) {
        this.dbContext = models;
    }

    /**
     * Get all courses  
     *
     * @description returns a list of all courses 
     */
    getAllCourses = async (req: Request, res: Response) => {
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let courses = await this.dbContext.Course.findAll();

            response.data = courses;
            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Get course allocations for staff 
     *
     * @description returns a list of courses allocated to staff
     * @param staffId id of staff member
     * @param approved type of course allocation to get, 1 for approved, 0 for unapproved
     */
    getCourseAllocationsForStaff = async (req: Request, res: Response) => {
        let staffId = req.params.staffId;
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let courses = await this.dbContext.Staff_Course.findAll({
                where: {
                    StaffId: staffId
                },
                include: {
                    model: Course, as: "Course"
                }
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
     * Add course allocation for staff 
     *
     * @description creates new unapproved allocation record
     * @param staffId id of staff member
     * @param courseId id of course to allocate
     */
    addCourseAllocationForStaff = async (req: Request, res: Response) => {
        let data: IAddStaffCourse = req.body;

        let response: IResponse = { errorMessage: "", data: "" };
        try {
            const allocation = await this.dbContext.Staff_Course.create({
                StaffId: data.staffId,
                CourseId: data.courseId
            });

            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }

    /**
     * Delete course allocation for staff 
     *
     * @description deletes allocation record
     * @param staffId id of staff member
     * @param courseId id of course to allocate
     */
    deleteCourseAllocationForStaff = async (req: Request, res: Response) => {
        let staffId = req.params.staffId;
        let courseId = req.params.courseId;

        let response: IResponse = { errorMessage: "", data: "" };

        try {
            const allocation = await this.dbContext.Staff_Course.destroy({
                where: {
                    StaffId: staffId,
                    CourseId: courseId
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
     * Get all unapproved course allocations  
     *
     * @description returns a list of unapproved course allocations
     */
    getUnapprovedCourseAllocations = async (req: Request, res: Response) => {
        let response: IResponse = { errorMessage: "", data: "" };
        try {
            let courses = await this.dbContext.Staff_Course.findAll({
                where: {
                    IsApproved: false
                },
                include: [
                    { model: Course, as: "Course" },
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
     * Approve course allocation  
     *
     * @description sets status of course allocation to approved 
     * @param staffId id of staff member
     * @param courseId id of course to allocate
     */
    ApproveCourseAllocationForStaff = async (req: Request, res: Response) => {
        let data: IAddStaffCourse = req.body;
        console.log(data);

        let response: IResponse = { errorMessage: "", data: "" };

        try {
            const allocation = await this.dbContext.Staff_Course.findOne({
                where: {
                    StaffId: data.staffId,
                    CourseId: data.courseId
                }
            });

            if (!allocation) {
                response.errorMessage = "Not found"
                return res.status(404).json(response);
            }

            allocation.IsApproved = false;
            await allocation.save();

            return res.status(200).json(response);
        } catch (err) {
            console.log((err as Error).message);
            response.errorMessage = (err as Error).message;
            return res.status(500).json(response);
        }
    }


}