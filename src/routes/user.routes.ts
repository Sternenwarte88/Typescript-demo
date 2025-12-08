import { Request, Response, Router } from 'express';
import { userController } from '../controller/controller.singleton.manager.js';

class UserRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    /**
     * Method for initializing te routes
     */
    private initRoutes(): void {
        this.router.get('/:id', this.getUser);
        this.router.get('/', this.getAllUsers);
        this.router.post('/', this.createUser);
        this.router.patch('/', this.updateUser);
        this.router.delete('/', this.deleteUser);
    }

    private getUser(_req: Request, res: Response): void {
        userController.GetUser(_req, res);
    }

    private getAllUsers(_req: Request, res: Response): void {
        userController.GetUsers(_req, res);
    }

    private createUser(_req: Request, res: Response): void {
        userController.CreateUser(_req, res);
    }

    private updateUser(_req: Request, res: Response): void {
        userController.UpdateUser(_req, res);
    }

    private deleteUser(_req: Request, res: Response): void {
        userController.DeleteUser(_req, res);
    }

    public getRouter(): Router {
        return this.router;
    }
}
export default new UserRouter().getRouter();
