import { Request, Response, Router } from 'express';
import { AutoBind } from '../decorators/default.decorator.js';

class UserRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/:id', this.getUser);
    this.router.get('/', this.getAllUsers);
    this.router.post('/', this.createUser);
    this.router.patch('/:id', this.updateUser);
    this.router.delete('/:id', this.deleteUser);
  }
  @AutoBind
  private getUser(_req: Request, res: Response) {
    res.status(200).json({ message: 'User route is working!' });
  }

  @AutoBind
  private getAllUsers(_req: Request, res: Response) {
    res.status(200).json({ message: 'All users route is working!' });
  }

  @AutoBind
  private createUser(_req: Request, res: Response) {
    res.status(201).json({ message: 'User created successfully!' });
  }

  @AutoBind
  private updateUser(_req: Request, res: Response) {
    res.status(200).json({ message: 'User updated successfully!' });
  }

  @AutoBind
  private deleteUser(_req: Request, res: Response) {
    res.status(200).json({ message: 'User deleted successfully!' });
  }

  public getRouter() {
    return this.router;
  }
}
export default new UserRouter().getRouter();
