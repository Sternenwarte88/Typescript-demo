import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import User from '../models/user.model.js';
import { userService } from '../services/service.singleton.manager.js';

export class UserController {
    /**
     * This method extracts the ID from the query and provides it to the GetUser method from UserService
     * @param req The Id which User should be looked up
     * @param res Sends back the result
     * @returns Either it breaks out with an error or it returns nothing
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

    /**
     * This method calls the userService get users and sends the users object back
     * @param _req not used at all
     * @param res The response with status and user object as JSON
     */
    public async GetUsers(_req: Request, res: Response): Promise<void> {
        const users = await userService.getUsers();

        res.status(200).json(users);
    }

    /**
     * This methid extracts the informations from the request body and provide it to the Service
     * @param req The User data
     * @param res the response to the client
     * @returns Either nothing or it breaks out with an error
     */
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

    /**
     * This method provides the ID from the query to the Service, for deleting the user.
     * @param req The ID which user should be deleted
     * @param res the response back to the client
     * @returns Either it returns nothing or it breaks out with an error
     */
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

    /**
     * This method extracts the data and provide it to the userService for creating a new user
     * @param req The information for making a new user
     * @param res the respons to the client
     * @returns Either nothing oder it breaks out with an error
     */
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
