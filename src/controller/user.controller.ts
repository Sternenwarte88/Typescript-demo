import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import User from '../models/user.model.js';
import { userService } from '../services/service.singleton.manager.js';

export class UserController {
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
        const user = plainToInstance(User, req.body);

        try {
            await validateOrReject(user, { whitelist: true });
        } catch (errors) {
            res.status(400).json({
                message: 'Validation failed',
                errors,
            });

            return;
        }

        user.updateAt = new Date();
        await userService.updateUser(user);
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
        const user = plainToInstance(User, req.body);

        try {
            await validateOrReject(user, { whitelist: true });
        } catch (errors) {
            res.status(400).json({
                message: 'Validation failed',
                errors,
            });

            return;
        }

        await userService.createUser(user);
        res.status(201).send({ msg: 'ok' });
    }
}
