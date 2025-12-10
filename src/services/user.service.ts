import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import IUser, { User } from '../models/user.model.js';
import { UserFile } from '../models/userFile.model.js';
import { NotFoundError } from '../utils/error/notFound.error.js';
import { fileProcessor } from '../utils/utils.singleton.manager.js';

export class UserService {
    /**
     * This constructor takes in an optional basePath, which overwrites the default.
     * This could be used for testing for example
     * @param basePath The basePath where the filde should be get written
     */
    constructor(private basePath: string = this.basePath ?? './userData.json') {
        this.initMethod();
    }

    /**
     * This method initializes the File for Users, if the file not exist.
     */
    private initMethod() {
        const fileExists = fs.existsSync(this.basePath);

        if (!fileExists) {
            const initData: { users: IUser[] } = { users: [] };
            const parsedData = JSON.stringify(initData, null, 2);

            fileProcessor.writeFile(parsedData, this.basePath);
        }
    }

    /**
     * This method gets an specific user from the user file
     * @param id The ID which belongs to the user which should get looked up
     * @returns The user.
     * @throws Throws an Error if the user coulnd´t be found
     */
    public async getUser(id: string): Promise<User> {
        const userFile: UserFile = await fileProcessor.getCompleteData(
            this.basePath,
        );

        const rawUser: User | undefined = userFile.users.find(
            (user: { id: string }) => user.id === id,
        );

        if (!rawUser) {
            throw new NotFoundError(`User with id ${id} not found`);
        }

        const user = plainToInstance(User, rawUser);

        return user;
    }

    /**
     * This method get all user from file
     * @returns all users from file
     * @throws Throws of no users could be found
     */
    public async getUsers(): Promise<UserFile> {
        const data = await fileProcessor.getCompleteData<UserFile>(
            this.basePath,
        );

        if (!data) {
            throw new NotFoundError(`Users not found`);
        }

        return data;
    }

    /**
     * This method tries to update the user
     * @param userData The updated data for the user which should be get updated
     * @throws Throws an Error if the User couldn´t be found
     */
    public async updateUser(userData: IUser): Promise<void> {
        const userFile: UserFile = await this.getUsers();
        const userArray: IUser[] = userFile.users;
        const index: number = userArray.findIndex((i) => i.id == userData.id);

        if (index === -1) {
            throw new NotFoundError('User not found');
        }

        userFile.users[index] = {
            ...userFile.users[index],
            ...userData,
            updateAt: new Date(),
        };

        fileProcessor.writeFile(userFile, this.basePath);
    }

    /**
     * This method tries to delete the user
     * @param id The ID from the user which should be delted
     * @throws Throws an Error if the user couldn´t be found
     */
    public async deleteUser(id: string): Promise<void> {
        const userFile: UserFile = await this.getUsers();
        const userArray: IUser[] = userFile.users;
        const index: number = userArray.findIndex((i) => i.id === id);

        if (index === -1) {
            throw new NotFoundError('User not found!');
        }

        userArray.splice(index, 1);
        userFile.users = userArray;

        fileProcessor.writeFile(userFile, this.basePath);
    }

    /**
     * This method tries to create a new user
     * @param user The data from the new user which should be created
     */
    public async createUser(user: IUser): Promise<void> {
        const userFile: UserFile = await fileProcessor.getCompleteData(
            this.basePath,
        );
        const userArray: IUser[] = userFile.users;
        const now = new Date();

        const userToWrite: IUser = {
            ...user,
            id: uuid(),
            createdAt: now,
            updateAt: now,
        };

        userArray.push(userToWrite);
        userFile.users = userArray;

        fileProcessor.writeFile(userFile, this.basePath);
    }
}
