import fs from 'fs';
import { afterAll, beforeEach, describe, expect, test } from 'vitest';
import IUser from '../../src/models/user.model';
import { UserService } from '../../src/services/user.service';
import { Role } from '../../src/types/role';

let counter = 0;
let testPath = `./tests/testfiles/testFile_user_${counter}.test.json`;

function createFakeUser(): IUser {
    const fakeUser: IUser = {
        createdAt: new Date(),
        email: 'fake@test.de',
        id: '123',
        name: 'test',
        Role: Role.Guest,
    };

    return fakeUser;
}

beforeEach(() => {
    if (fs.existsSync(testPath)) {
        fs.unlinkSync(testPath);
    }

    counter++;

    testPath = `./tests/testfiles/testFile_user_${counter}.test.json`;
});

afterAll(() => {
    if (fs.existsSync(testPath)) {
        fs.unlinkSync(testPath);
    }
});

describe('Create User', () => {
    test('Successfully creating user', async () => {
        const fakeUser = createFakeUser();
        const userService = new UserService(testPath);

        await userService.createUser(fakeUser);

        const result = await userService.getUsers();
        const user = result.users[0];

        expect(result.users.length).toBe(1);
        expect(user.email).toBe(fakeUser.email);
        expect(user.name).toBe(fakeUser.name);
    });
});

describe('Read User', () => {
    test('successfully read user', async () => {
        const fakeUser = createFakeUser();
        const userService = new UserService(testPath);

        await userService.createUser(fakeUser);

        const result = await userService.getUsers();
        const user = await userService.getUser(result.users[0].id);

        expect(user.name).toEqual(fakeUser.name);
        expect(user.createdAt).toBeInstanceOf(Date);
    });
    test('failed to read user', async () => {
        const userService = new UserService(testPath);

        await expect(userService.getUser('23')).rejects.toThrowError(
            'User with id 23 not found',
        );
    });
});

describe('delete User', () => {
    test('successfully deleted user', async () => {
        const fakeUser = createFakeUser();
        const userService = new UserService(testPath);

        await userService.createUser(fakeUser);

        let result = await userService.getUsers();

        await userService.deleteUser(result.users[0].id);

        result = await userService.getUsers();

        expect(result.users.length).toBe(0);
    });

    test('failed to delete user', async () => {
        const userService = new UserService(testPath);

        await expect(userService.deleteUser('23')).rejects.toThrowError(
            'Index not found!',
        );
    });
});
