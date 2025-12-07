import { Request, Response, Router } from 'express';
import courseController from '../controller/course.controller.js';

class CourseRoutes {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/:id', this.getCourse);
        this.router.get('/', this.getAllCourses);
        this.router.post('/', this.createCourse);
        this.router.patch('/', this.updateCourse);
        this.router.delete('/:id', this.deleteCourse);
    }

    private getCourse(req: Request, res: Response) {
        courseController.getCourse(req, res);
    }

    private getAllCourses(req: Request, res: Response) {
        courseController.getAllCourses(req, res);
    }

    private createCourse(req: Request, res: Response) {
        courseController.createCourse(req, res);
    }

    private updateCourse(req: Request, res: Response) {
        courseController.updateCourse(req, res);
    }

    private deleteCourse(req: Request, res: Response) {
        courseController.deleteCourse(req, res);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default new CourseRoutes().getRouter();
