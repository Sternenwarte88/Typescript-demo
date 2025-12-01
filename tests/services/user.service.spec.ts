import fs from 'fs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import IUser from '../../src/models/user.model';
import { UserFile } from '../../src/models/userFile.model';
import { Role } from '../../src/types/role';
import fileProcessor from '../../src/utils/fileProcessor';
import { UserService } from './../../src/services/user.service';

vi.mock('fs', () => ({
    default: {
        existsSync: vi.fn().mockReturnValue(true),
    },
}));

vi.mock('../../src/utils/fileProcessor', () => ({
    default: {
        writeFile: vi.fn(),
        getCompleteData: vi.fn(),
    },
}));

const mockedFS = vi.mocked(fs, true);
const mockedFileProcessor = vi.mocked(fileProcessor, true);

beforeEach(() => {
    vi.resetAllMocks();
    mockedFS.existsSync.mockReturnValue(true);
});

function createFakeData(): IUser {
    return {
        createdAt: new Date(),
        email: 'test@test.de',
        id: '123',
        name: 'test',
        Role: Role.Guest,
        updateAt: new Date(),
    };
}

describe('Init userService', () => {
    test("File isn't aviable", () => {
        mockedFS.existsSync.mockReturnValue(false);

        const userService = new UserService();

        expect(mockedFileProcessor.writeFile).toBeCalled();
    });
    test('File is avaible', () => {
        const userService = new UserService();

        expect(mockedFileProcessor.writeFile).not.toBeCalled();
    });
});

describe('Get User', () => {
    test('Failing getting User', async () => {
        const fakeData = createFakeData();
        const fakeUserFile: UserFile = {
            users: [fakeData],
        };

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeUserFile);

        const userService = new UserService();

        await expect(userService.getUser('345')).rejects.toThrowError(
            `User with id 345 not found`,
        );
    });

    test('Getting User', async () => {
        const fakeData = createFakeData();
        const fakeUserFile: UserFile = {
            users: [fakeData],
        };

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeUserFile);

        const userService = new UserService();
        const result = await userService.getUser(fakeData.id);

        expect(result.createdAt).toBeInstanceOf(Date);
        expect(typeof result.id).toBe('string');
        expect(Object.values(Role)).toContain(result.Role);
    });
});

describe('Get Users', () => {
    test('On successfully getting Users', async () => {
        const fakeData = createFakeData();
        const fakeUserFile: UserFile = {
            users: [fakeData],
        };

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeUserFile);

        const userService = new UserService();

        await expect(userService.getUsers()).resolves.toEqual(fakeUserFile);
    });

    test('On failing getting Users', async () => {
        mockedFileProcessor.getCompleteData.mockResolvedValue(null);

        const userService = new UserService();

        await expect(userService.getUsers()).rejects.toThrow(`Users not found`);
    });
});

describe('Update User', () => {
    test('Updating User with wrong data. ID not matching', async () => {
        const fakeData = createFakeData();
        const fakeUserFile: UserFile = {
            users: [fakeData],
        };

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeUserFile);

        const userService = new UserService();

        const wrongUser: IUser = { ...fakeData };

        wrongUser.id = '234';

        await expect(userService.updateUser(wrongUser)).rejects.toThrowError(
            'User not found',
        );
    });

    test('Updateing user with correct data.', async () => {
        const fakeData = createFakeData();
        const fakeUserFile: UserFile = {
            users: [fakeData],
        };

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeUserFile);

        const userService = new UserService();

        const newUser: IUser = { ...fakeData };

        newUser.email = 'test@test2.de';
        await userService.updateUser(newUser);

        const [dataArg] = mockedFileProcessor.writeFile.mock.calls[0] as [
            UserFile,
            string,
        ];

        expect(dataArg.users[0].email).toBe('test@test2.de');
        expect(mockedFileProcessor.writeFile).toBeCalledTimes(1);
    });
});

describe('Delete User', () => {
    test('failing to delete the user', async () => {
        const fakeData = createFakeData();
        const fakeUserFile: UserFile = {
            users: [fakeData],
        };

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeUserFile);

        const userService = new UserService();

        await expect(userService.deleteUser('223')).rejects.toThrowError(
            'Index not found!',
        );
    });

    test('successfully delete User', async () => {
        const fakeData = createFakeData();
        const fakeUserFile: UserFile = {
            users: [fakeData],
        };

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeUserFile);

        const userService = new UserService();

        await userService.deleteUser(fakeData.id);

        expect(mockedFileProcessor.writeFile).toBeCalled();
    });
});
describe('Creating user', () => {
    test('Creating user, correct Data', async () => {
        const fakeData = createFakeData();
        const fakeUserData: UserFile = { users: [fakeData] };

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeUserData);

        const newFakeData: IUser = {
            id: '',
            name: 'fakeUser2',
            createdAt: new Date(),
            updateAt: new Date(),
            email: 'test2@test2.de',
            Role: Role.Guest,
        };

        const userService = new UserService();

        await userService.createUser(newFakeData);

        const [dataArg] = mockedFileProcessor.writeFile.mock.calls[0] as [
            UserFile,
            string,
        ];
        const val = dataArg.users[0];

        expect(typeof val.id).toBe('string');
        expect(val.createdAt).toBeInstanceOf(Date);
        expect(Object.values(Role)).toContain(val.Role);
    });
});
