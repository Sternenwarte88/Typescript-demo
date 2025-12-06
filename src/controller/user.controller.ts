import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import IUser from '../models/user.model.js';
import { userService } from '../services/service.singleton.manager.js';

class UserController {
    /**
     * name
     */
    public async GetUser(req: Request, res: Response): Promise<void> {
        const id = req.query.id;

        if (typeof id !== 'string') {
            res.status(400).json({
                error: 'Query parameter "id" is required and must be a string',
            });

            return;
        }

        let user = await userService.getUser(id);

        res.status(200).json(user);
    }

    public async GetUsers(_req: Request, res: Response): Promise<void> {
        const users = await userService.getUsers();

        res.status(200).json(users);
    }

    public async UpdateUser(req: Request, res: Response): Promise<void> {
        const userData: IUser = req.body;

        userData.updateAt = new Date();
        await userService.updateUser(userData);
        res.status(200).send({ msg: 'ok' });
    }

    public async DeleteUser(req: Request, res: Response): Promise<void> {
        const id = req.query.id;

        if (typeof id !== 'string') {
            res.status(400).json({
                error: 'Query parameter "id" is required and must be a string',
            });

            return;
        }

        await userService.deleteUser(id);
        res.status(200).send({ msg: 'ok' });
    }

    public async CreateUser(req: Request, res: Response): Promise<void> {
        let user = req.body as IUser;

        user.id = uuid();
        user.createdAt = new Date();
        user.updateAt = user.createdAt;
        await userService.createUser(user);
        res.status(201).send({ msg: 'ok' });
    }
}

export default new UserController();
