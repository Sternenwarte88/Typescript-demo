import fs from 'fs';
import { beforeEach, vi } from 'vitest';
import fileProcessor from '../../src/utils/fileProcessor';

vi.mock('fs', () => ({
    default: {
        existsSync: vi.fn().mockReturnValue(true),
    },
}));

vi.mock('fileProzessor', () => ({
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
