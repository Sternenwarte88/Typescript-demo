import fs from 'fs';
import IUser from '../models/user.model.js';
import { UserFile } from '../models/userFile.model.js';
import fileProcessor from '../utils/fileProcessor.js';

class UserService {
    private basePath = './userData.json';

    constructor() {
        this.initMethod();
    }

    private async initMethod() {
        const fileExists = fs.existsSync(this.basePath);

        if (!fileExists) {
            const initData: { users: IUser[] } = { users: [] };
            const parsedData = JSON.stringify(initData, null, 2);

            await fileProcessor.writeFile(parsedData, this.basePath);
        }
    }

    public async getUser(id: string): Promise<IUser> {
        const userFile: UserFile = await fileProcessor.getCompleteData(
            this.basePath,
        );

        const users = userFile.users.map((u) => ({
            ...u,
            createdAt: new Date(u.createdAt),
            updateAt: u.updateAt ? new Date(u.updateAt) : undefined,
        }));

        const user: IUser | undefined = users.find(
            (user: { id: string }) => user.id === id,
        );

        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        return user;
    }

    public async getUsers(): Promise<UserFile> {
        const data = await fileProcessor.getCompleteData<UserFile>(
            this.basePath,
        );

        if (!data) {
            throw new Error(`Users not found`);
        }

        return data;
    }

    public async updateUser(userData: IUser): Promise<void> {
        const userFile: UserFile = await this.getUsers();
        const userArray: IUser[] = userFile.users;
        const index: number = userArray.findIndex((i) => i.id == userData.id);

        if (index === -1) {
            return;
        }

        userArray[index].name = userData.name;
        userArray[index].Role = userData.Role;
        userArray[index].email = userData.email;
        userArray[index].updateAt = new Date();
        userFile.users = userArray;

        await fileProcessor.writeFile(userFile, this.basePath);
    }

    public async deleteUser(id: string): Promise<void> {
        const userFile: UserFile = await this.getUsers();
        const userArray: IUser[] = userFile.users;
        const index: number = userArray.findIndex((i) => i.id === id);

        if (index === -1) {
            throw new Error('Index not found!');
        }

        userArray.splice(index, 1);
        userFile.users = userArray;

        fileProcessor.writeFile(userFile, this.basePath);
    }

    public async createUser(user: IUser): Promise<void> {
        const userFile: UserFile = await this.getUsers();
        const userArray: IUser[] = userFile.users;

        userArray.push(user);
        userFile.users = userArray;

        fileProcessor.writeFile(userFile, this.basePath);
    }
}

export const userService = new UserService();
// fot Testing
export { UserService };
