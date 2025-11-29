import fs from 'fs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ICourse } from '../../src/models/course.model.js';
import { CourseFile } from '../../src/models/courseFile.model.js';
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

const courseFakeData: CourseFile = {
    courses: [
        {
            id: '123',
            name: 'fakeCourse',
            createdAt: new Date(),
            updateAt: new Date(),
            description: 'fakeData',
            price: 0,
            tags: ['fake', 'data'],
            author: 'faker',
        },
    ],
};

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



  describe('Get all courses', () => {
      beforeEach(() => {
          vi.clearAllMocks();
      });

      test('When data would be avaiable', async () => {
          (fileProcessor.getCompleteData as any).mockReturnValue(
              courseFakeData,
          );

          const courseService = new CourseService();

          expect(await courseService.getAllCourses()).toEqual(courseFakeData);
      });

      test('When data would be not avaiable', async () => {
          (fileProcessor.getCompleteData as any).mockReturnValue(
              null,
          );

          const courseService = new CourseService();

          await expect(courseService.getAllCourses()).rejects.toThrowError(`Course not found`)
      });
  });