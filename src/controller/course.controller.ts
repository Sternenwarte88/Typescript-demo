import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Course } from '../models/course.model.js';
import { courseService } from '../services/service.singleton.manager.js';
import { ValidationError } from '../utils/error/validationError.js';

/**
 * This controller takes the data, validate them and passes the object to the service
 */
export class CourseController {
    /**
     * This method gets all courses which are aviavble
     * @param _ Is not used at all
     * @param res Response object
     */
    public async getAllCourses(_: Request, res: Response): Promise<void> {
        const result = await courseService.getAllCourses();
        const courses = result.courses;

        res.json(courses).status(200);
    }

    /**
     * This method get one specific course.
     * It extracts the data and passes them to the service
     * @param req The request Body, where the ID is extracted from
     * @param res The response object to the client
     */
    public async getCourse(req: Request, res: Response): Promise<void> {
        const id = req.query.id as string;

        const result = await courseService.getCourse(id);

        res.json(result).status(200);
    }

    /**
     * This method takes the req.body, forms it into an Course object and provide it to the service.
     * It´s for creating a new course
     * @param req In that request is the date for the course
     * @param res The response for creating a new course
     * @returns Eather it breaks out of the validation or it returns nothing
     */
    public async createCourse(req: Request, res: Response): Promise<void> {
        const course = plainToInstance(Course, req.body);

        try {
            await validateOrReject(course, { whitelist: true });
        } catch (errors) {
            throw new ValidationError('Validation failed', errors);
        }

        course.createdAt = new Date();
        course.updateAt = course.createdAt;
        course.id = uuid();

        await courseService.createCourse(course);
        res.json({ msg: 'ok' }).status(200);
    }

    /**
     * This method takes the id from the params and provide it to the delete method of the service
     * @param req The ID which course should be deleted
     * @param res The response if the course was successfully deleted
     */
    public async deleteCourse(req: Request, res: Response) {
        const id = req.params.id as string;

        await courseService.deleteCourse(id);

        res.json({ msg: 'ok' });
    }

    /**
     *  This method extracts data from the body and provide it to the service for updating the course
     * @param req is filled with data from Course classe
     * @param res the response of updating the course
     * @returns an error and breaks out or returns nothing
     */
    public async updateCourse(req: Request, res: Response): Promise<void> {
        const course = plainToInstance(Course, req.body);

        try {
            await validateOrReject(course, { whitelist: true });
        } catch (errors) {
            throw new ValidationError('Validation failed', errors);
        }

        const result = await courseService.updateCourse(course);

        res.json(result);
    }
}
