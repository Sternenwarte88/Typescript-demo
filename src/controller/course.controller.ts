import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Course } from '../models/course.model.js';
import { courseService } from '../services/service.singleton.manager.js';

class CourseController {
    public async getAllCourses(_req: Request, res: Response): Promise<void> {
        const result = await courseService.getAllCourses();
        const courses = result.courses;

        res.json(courses).status(200);
    }

    public async getCourse(req: Request, res: Response): Promise<void> {
        const id = req.query.id as string;

        const result = await courseService.getCourse(id);

        res.json(result).status(200);
    }

    public async createCourse(req: Request, res: Response) {
        const course = plainToInstance(Course, req.body);

        try {
            await validateOrReject(course, { whitelist: true });
        } catch (errors) {
            res.status(400).json({
                message: 'Validation failed',
                errors,
            });

            return;
        }

        course.createdAt = new Date();
        course.updateAt = course.createdAt;
        course.id = uuid();

        await courseService.createCourse(course);
        res.json({ msg: 'ok' }).status(200);
    }

    public async deleteCourse(req: Request, res: Response) {
        const id = req.params.id as string;

        await courseService.deleteCourse(id);

        res.json({ msg: 'ok' });
    }

    public async updateCourse(req: Request, res: Response) {
        const course = plainToInstance(Course, req.body);

        try {
            await validateOrReject(course, { whitelist: true });
        } catch (errors) {
            res.status(400).json({
                message: 'Validation failed',
                errors,
            });

            return;
        }

        const result = await courseService.updateCourse(course);

        res.json(result);
    }
}

export default new CourseController();
