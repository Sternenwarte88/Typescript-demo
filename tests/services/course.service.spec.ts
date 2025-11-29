import fs from 'fs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ICourse } from '../../src/models/course.model.js';
import { CourseFile } from '../../src/models/courseFile.model.js';
import { CourseService } from '../../src/services/course.service';
import fileProcessor from '../../src/utils/fileProcessor.js';
import { number } from 'zod/v4';

vi.mock('fs', () => ({
    default: {
        existsSync: vi.fn().mockReturnValue(true),
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

const mockedFileProcessor = vi.mocked(fileProcessor, true);
const mockedFS = vi.mocked(fs, true);

beforeEach(() => {
    vi.clearAllMocks();
    (fs.existsSync as any).mockReturnValue(true);
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
    test('File should be already exist', async () => {

        const courseService = new CourseService();

        expect(mockedFileProcessor.writeFile).not.toBeCalled();
    });

    test('File shouldn`t be already exist', async () => {
        (mockedFS.existsSync).mockReturnValue(false);

        const courseService = new CourseService();

        expect(mockedFileProcessor.writeFile).toBeCalled();
    });

    test('File shouldn`t be already exist and have correct path', async () => {
        (mockedFS.existsSync as any).mockReturnValue(false);

        const courseService = new CourseService();

        const [_, pathArg] = (mockedFileProcessor.writeFile).mock.calls[0];

        expect(pathArg).toBe('./courseData.json');
    });

    test('File shouldn`t be already exist and have correct data', async () => {
        (mockedFS.existsSync as any).mockReturnValue(false);

        const fakeCourseData: { courses: ICourse[] } = { courses: [] };

        const courseService = new CourseService();

        const [dataArg] = (mockedFileProcessor.writeFile as any).mock.calls[0];
        const parsedData = JSON.parse(dataArg);

        expect(parsedData).toEqual(fakeCourseData);
    });
});



  describe('Get all courses', () => {

      test('When data would be avaiable', async () => {
          (mockedFileProcessor.getCompleteData as any).mockReturnValue(
              courseFakeData,
          );

          const courseService = new CourseService();

          expect(await courseService.getAllCourses()).toEqual(courseFakeData);
      });

      test('When data would be not avaiable', async () => {
          (mockedFileProcessor.getCompleteData as any).mockReturnValue(
              null,
          );

          const courseService = new CourseService();

          await expect(courseService.getAllCourses()).rejects.toThrowError(`Course not found`)
      });
  });


  describe("Get Course",() => {

    test("Find Course", async () => {
        (mockedFileProcessor.getCompleteData as any).mockReturnValue(
          courseFakeData,
        );
          
        const courseService = new CourseService();

        expect(await courseService.getCourse("123")).toEqual(courseFakeData.courses[0])

    } )

    test("Can´t Find Course", async () => {
        (mockedFileProcessor.getCompleteData as any).mockReturnValue(
          courseFakeData,
        );
          
        const courseService = new CourseService();

        await expect(courseService.getCourse("23")).rejects.toThrowError('course is undefined')

    } )
  })

  describe("Write Course into file", () => {
    test("Creating course, write operation",async ()=> {

        const courseService = new CourseService()

        await courseService.createCourse(courseFakeData.courses[0])
        expect(mockedFileProcessor.writeFile).toBeCalled();
    })

    test("Creating course, correct Data",async ()=> {

        (mockedFileProcessor.getCompleteData as any).mockReturnValue(
          { courses: [] },
        );

        const newFakeData: ICourse =  {
            id: "",
            name: 'fakeCourse2',
            createdAt: new Date(),
            updateAt: new Date(),
            description: 'fakeData2',
            price: 1,
            tags: ['fake2', 'data2'],
            author: 'faker2',
        }

        const courseService = new CourseService()

        await courseService.createCourse(newFakeData);

        const [dataArg] = (mockedFileProcessor.writeFile).mock.calls[0] as  [CourseFile, string];
        const val = dataArg.courses[0];

        expect(typeof val.id).toBe("string")
        expect(val.createdAt).instanceOf(Date)
        expect(typeof val.price).toBe("number")
        
    })
  })