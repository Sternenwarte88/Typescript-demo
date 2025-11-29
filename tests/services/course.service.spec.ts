import fs from 'fs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ICourse } from '../../src/models/course.model.js';
import { CourseService } from '../../src/services/course.service';
import fileProcessor from '../../src/utils/fileProcessor.js';

vi.mock('fs', () => ({
    default: {
        existsSync: vi.fn(),
    },
}));

vi.mock('../../src/utils/fileProcessor.js', () => {
    return {
        default: {
            writeFile: vi.fn(),
            getCompleteData: vi.fn(),
        },
    };
});

describe('CourseService init', () => {
    beforeEach(() => {
        // Clear all mockhistories before each test
        vi.clearAllMocks();
    });

    test('File should be already exist', async () => {
        (fs.existsSync as any).mockReturnValue(true);

        const courseService = new CourseService();

        expect(fileProcessor.writeFile).not.toBeCalled();
    });

    test('File shouldn`t be already exist', async () => {
        (fs.existsSync as any).mockReturnValue(false);

        const courseService = new CourseService();

        expect(fileProcessor.writeFile).toBeCalled();
    });

    test('File shouldn`t be already exist and have correct path', async () => {
        (fs.existsSync as any).mockReturnValue(false);

        const courseService = new CourseService();

        const [_, pathArg] = (fileProcessor.writeFile as any).mock.calls[0];

        expect(pathArg).toBe('./courseData.json');
    });

    test('File shouldn`t be already exist and have correct data', async () => {
        (fs.existsSync as any).mockReturnValue(false);

        const fakeCourseData: { courses: ICourse[] } = { courses: [] };

        const courseService = new CourseService();

        const [dataArg] = (fileProcessor.writeFile as any).mock.calls[0];
        const parsedData = JSON.parse(dataArg);

        expect(parsedData).toEqual(fakeCourseData);
    });
});
