import { Request, Response, Router } from 'express';
import courseController from '../controller/course.controller.js';
import { AutoBind } from '../decorators/default.decorator.js';

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

    @AutoBind
    private getCourse(req: Request, res: Response) {
        courseController.getCourse(req, res);
    }
    @AutoBind
    private getAllCourses(req: Request, res: Response) {
        courseController.getAllCourses(req, res);
    }
    @AutoBind
    private createCourse(req: Request, res: Response) {
        courseController.createCourse(req, res);
    }
    @AutoBind
    private updateCourse(req: Request, res: Response) {
        courseController.updateCourse(req, res);
    }
    @AutoBind
    private deleteCourse(req: Request, res: Response) {
        courseController.deleteCourse(req, res);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default new CourseRoutes().getRouter();