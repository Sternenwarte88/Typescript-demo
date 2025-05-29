import { Request, Response, Router } from 'express';
import userController from '../controller/user.controller.js';
import { AutoBind } from '../decorators/default.decorator.js';

class UserRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get('/:id', this.getUser);
    this.router.get('/', this.getAllUsers);
    this.router.post('/', this.createUser);
    this.router.patch('/', this.updateUser);
    this.router.delete('/', this.deleteUser);
  }
  @AutoBind
  private getUser(_req: Request, res: Response): void {
    userController.GetUser(_req, res);
  }

  @AutoBind
  private getAllUsers(_req: Request, res: Response): void {
    userController.GetUsers(_req, res);
  }

  @AutoBind
  private createUser(_req: Request, res: Response): void {
    userController.CreateUser(_req, res);
  }

  @AutoBind
  private updateUser(_req: Request, res: Response): void {
    userController.UpdateUser(_req, res);
  }

  @AutoBind
  private deleteUser(_req: Request, res: Response): void {
    userController.DeleteUser(_req, res);
  }

  public getRouter(): Router {
    return this.router;
  }
}
export default new UserRouter().getRouter();
