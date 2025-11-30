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
    test("File isn't avaible", () => {
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
        const parsedFakedUserFile = JSON.stringify(fakeUserFile);

        mockedFileProcessor.getCompleteData.mockResolvedValue(
            parsedFakedUserFile,
        );

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
        const parsedFakedUserFile = JSON.stringify(fakeUserFile);

        mockedFileProcessor.getCompleteData.mockResolvedValue(
            parsedFakedUserFile,
        );

        const userService = new UserService();
        const result = await userService.getUser(fakeData.id);

        expect(result.createdAt).toBeInstanceOf(Date);
        expect(typeof result.id).toBe('string');
        expect(Object.values(Role)).toContain(result.Role);
    });
});
