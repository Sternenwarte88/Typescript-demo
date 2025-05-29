import { UserFile } from '../models/userFile.model.js';
import fs from 'fs';
import User from '../models/user.model.js';
class UserService {
  private basePath = './userData.json';

  constructor() {
    this.initMethod();
  }

  private async initMethod() {
    const fileExists = fs.existsSync(this.basePath);
    console.log(fileExists);
    if (!fileExists) {
      try {
        const initData = { users: [] };
        const parsedData = JSON.stringify(initData, null, 2);
        await fs.promises.writeFile(this.basePath, parsedData, 'utf8');
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Error reading file: ${error.message}`);
        }
      }
    }
  }

  public async getUser(id: string): Promise<User> {
    let raw: string | undefined;

    try {
      raw = await fs.promises.readFile(this.basePath, 'utf8');
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Error reading file: ${err.message}`);
      }
    }

    if (typeof raw !== 'string') {
      throw new Error('File content is not a string');
    }

    const data = JSON.parse(raw, (key, value) =>
      key === 'createdAt' || key === 'updatedAt' ? new Date(value) : value
    ) as UserFile;

    const user: User | undefined = data.users.find((user: { id: string }) => user.id === id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  public async getUsers(): Promise<UserFile> {
    let raw: string | undefined;
    try {
      raw = await fs.promises.readFile(this.basePath, 'utf8');
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error reading file: ${error.message}`);
      }
    }
    if (typeof raw !== 'string') {
      throw new Error('File content is not a string');
    }
    const data = JSON.parse(raw) as UserFile;
    if (!data) {
      throw new Error(`Users not found`);
    }
    return data;
  }

  public async updateUser(userData: User): Promise<void> {
    const userFile: UserFile = await this.getUsers();

    const userArray: User[] = userFile.users;
    const index: number = userArray.findIndex((i) => i.id == userData.id);
    if (index === -1) {
      console.log('Index not found!');
      return;
    }
    userArray[index].name = userData.name;
    userArray[index].Role = userData.Role;
    userArray[index].email = userData.email;
    userArray[index].updatedAt = new Date();
    userFile.users = userArray;
    try {
      const raw: string = JSON.stringify(userFile, null, 2);
      await fs.promises.writeFile(this.basePath, raw, 'utf8');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error writing file: ${error.message}`);
      }
    }
  }

  public async deleteUser(id: string): Promise<void> {
    const userFile: UserFile = await this.getUsers();
    const userArray: User[] = userFile.users;
    const index: number = userArray.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error('Index not found!');
    }
    userArray.splice(index, 1);
    userFile.users = userArray;

    try {
      const raw: string = JSON.stringify(userFile, null, 2);
      await fs.promises.writeFile(this.basePath, raw, 'utf8');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error writing file: ${error.message}`);
      }
    }
  }

  public async createUser(user: User): Promise<void> {
    const userFile: UserFile = await this.getUsers();
    const userArray: User[] = userFile.users;
    userArray.push(user);
    userFile.users = userArray;
    try {
      const raw: string = JSON.stringify(userFile, null, 2);
      await fs.promises.writeFile(this.basePath, raw, 'utf8');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error writing file: ${error.message}`);
      }
    }
  }
}

export default new UserService();
