import fs from 'fs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import fileProcessor from '../../src/utils/fileProcessor';
import { UserService } from './../../src/services/user.service';

vi.mock('fs', () => ({
    default: {
        existsSync: vi.fn().mockReturnValue(true),
    },
}));

vi.mock('../../src/utils/fileProcessor.ts', () => ({
    default: {
        writeFile: vi.fn(),
        getCompleteData: vi.fn(),
    },
}));

const mockedFS = vi.mocked(fs, true);
const mockedFileProcessor = vi.mocked(fileProcessor, true);

beforeEach(() => {
    vi.resetAllMocks();
    mockedFS.existsSync.mockResolvedValue(true);
});

describe('Init userService', () => {
    test("File isn't avaible", () => {
        mockedFS.existsSync.mockReturnValue(false);

        const userService = new UserService();

        expect(mockedFileProcessor.writeFile).toBeCalled();
    });
    test("File is avaible", () => {
        

        const userService = new UserService();

        expect(mockedFileProcessor.writeFile).not.toBeCalled();
    });
});
