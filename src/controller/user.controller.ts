import { Request, Response } from 'express';
import UserService from '../services/user.service.js';
import User from '../models/user.model.js';
import { v4 as uuid } from 'uuid';

class UserController {
  /**
   * name
   */
  public async GetUser(req: Request, res: Response): Promise<void> {
    const id = req.query.id;
    if (typeof id !== 'string') {
      res.status(400).json({ error: 'Query parameter "id" is required and must be a string' });
      return;
    }

    let user = await UserService.getUser(id);
    res.status(200).json(user);
  }

  public async GetUsers(_req: Request, res: Response): Promise<void> {
    const users = await UserService.getUsers();
    res.status(200).json(users);
  }

  public async UpdateUser(req: Request, res: Response): Promise<void> {
    const userData: User = req.body;
    userData.updatedAt = new Date();
    await UserService.updateUser(userData);
    res.status(200).send({ msg: 'ok' });
  }

  public async DeleteUser(req: Request, res: Response): Promise<void> {
    const id = req.query.id;
    if (typeof id !== 'string') {
      res.status(400).json({ error: 'Query parameter "id" is required and must be a string' });
      return;
    }
    await UserService.deleteUser(id);
    res.status(200).send({ msg: 'ok' });
  }

  public async CreateUser(req: Request, res: Response): Promise<void> {
    let user = req.body as User;
    user.id = uuid();
    user.createdAt = new Date();
    user.updatedAt = user.createdAt;
    await UserService.createUser(user);
    res.status(201).send({ msg: 'ok' });
  }
}

export default new UserController();
