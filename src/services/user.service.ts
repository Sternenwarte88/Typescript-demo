import { UserFile } from '../models/userFile.model.js';
import fs from 'fs';
import User from '../models/user.model.js';
class UserService {
  private basePath = '../../userData.json';

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

  public async getUsers(): Promise<User[]> {
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
    return data.users;
  }

  public async updateUser(userData: User): Promise<void> {
    const users: User[] = await this.getUsers();
    const index: number = users.findIndex((i) => i.id == userData.id);
    if (index === -1) {
      throw new Error('Index not found!');
    }
    users[index] = userData;
    try {
      const raw: string = JSON.stringify(users);
      await fs.promises.writeFile(this.basePath, raw, 'utf8');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error writing file: ${error.message}`);
      }
    }
  }

  public async deleteUser(id: string): Promise<void> {
    const users: User[] = await this.getUsers();
    const index: number = users.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error('Index not found!');
    }
    users.splice(index, 1);

    try {
      const raw: string = JSON.stringify(users);
      await fs.promises.writeFile(this.basePath, raw, 'utf8');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error writing file: ${error.message}`);
      }
    }
  }

  public async createUser(user: User): Promise<void> {
    const users: User[] = await this.getUsers();
    users.push(user);

    try {
      const raw: string = JSON.stringify(users);
      await fs.promises.writeFile(this.basePath, raw, 'utf8');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error writing file: ${error.message}`);
      }
    }
  }
}

export default new UserService();
