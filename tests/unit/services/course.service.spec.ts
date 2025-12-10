import fs from 'fs';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Course } from '../../../src/models/course.model.js';
import { CourseFile } from '../../../src/models/courseFile.model.js';
import { CourseService } from '../../../src/services/course.service';
import { fileProcessor } from '../../../src/utils/utils.singleton.manager.js';

vi.mock('fs', () => ({
    default: {
        existsSync: vi.fn().mockReturnValue(true),
    },
}));

vi.mock('../../../src/utils/utils.singleton.manager.js', () => {
    return {
        fileProcessor: {
            writeFile: vi.fn(),
            getCompleteData: vi.fn(),
        },
    };
});

const mockedFileProcessor = vi.mocked(fileProcessor, true);
const mockedFS = vi.mocked(fs, true);

beforeEach(() => {
    vi.clearAllMocks();
    mockedFS.existsSync.mockReturnValue(true);
});

function makeFakeData(): CourseFile {
    const baseCourse: Course = {
        id: '123',
        name: 'fakeCourse',
        createdAt: new Date(),
        updateAt: new Date(),
        description: 'fakeData',
        price: 0,
        tags: ['fake', 'data'],
        author: 'faker',
    };

    return {
        courses: [{ ...baseCourse }],
    };
}

describe('CourseService init', () => {
    test('File should be already exist', async () => {
        const courseService = new CourseService();

        expect(mockedFileProcessor.writeFile).not.toBeCalled();
    });

    test('File shouldn`t be already exist', async () => {
        mockedFS.existsSync.mockReturnValue(false);

        const courseService = new CourseService();

        expect(mockedFileProcessor.writeFile).toBeCalled();
    });

    test('File shouldn`t be already exist and have correct path', async () => {
        mockedFS.existsSync.mockReturnValue(false);

        const courseService = new CourseService();

        const [_, pathArg] = mockedFileProcessor.writeFile.mock.calls[0];

        expect(pathArg).toBe('./courseData.json');
    });

    test('File shouldn`t be already exist and have correct data', async () => {
        mockedFS.existsSync.mockReturnValue(false);

        const fakeCourseData: { courses: Course[] } = { courses: [] };

        const courseService = new CourseService();

        const [dataArg] = (mockedFileProcessor.writeFile as any).mock.calls[0];
        const parsedData = JSON.parse(dataArg);

        expect(parsedData).toEqual(fakeCourseData);
    });
});

describe('Get all courses', () => {
    test('When data would be avaiable', async () => {
        const fakeData = makeFakeData();

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeData);

        const courseService = new CourseService();

        expect(await courseService.getAllCourses()).toEqual(fakeData);
    });

    test('When data would be not avaiable', async () => {
        mockedFileProcessor.getCompleteData.mockResolvedValue(null);

        const courseService = new CourseService();

        await expect(courseService.getAllCourses()).rejects.toThrowError(
            `Course not found`,
        );
    });
});

describe('Get Course', () => {
    test('Find Course', async () => {
        const fakeData = makeFakeData();

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeData);

        const courseService = new CourseService();

        expect(await courseService.getCourse('123')).toEqual(
            fakeData.courses[0],
        );
    });

    test('Can´t Find Course', async () => {
        const fakeData = makeFakeData();

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeData);

        const courseService = new CourseService();

        await expect(courseService.getCourse('23')).rejects.toThrowError(
            'course is undefined',
        );
    });
});

describe('Write Course into file', () => {
    test('Creating course, write operation', async () => {
        mockedFileProcessor.getCompleteData.mockResolvedValue({ courses: [] });

        const fakeData = makeFakeData();

        const courseService = new CourseService();

        await courseService.createCourse(fakeData.courses[0]);
        expect(mockedFileProcessor.writeFile).toBeCalled();
    });

    test('Creating course, correct Data', async () => {
        mockedFileProcessor.getCompleteData.mockResolvedValue({ courses: [] });

        const newFakeData: Course = {
            id: '',
            name: 'fakeCourse2',
            createdAt: new Date(),
            updateAt: new Date(),
            description: 'fakeData2',
            price: 1,
            tags: ['fake2', 'data2'],
            author: 'faker2',
        };

        const courseService = new CourseService();

        await courseService.createCourse(newFakeData);

        const [dataArg] = mockedFileProcessor.writeFile.mock.calls[0] as [
            CourseFile,
            string,
        ];
        const val = dataArg.courses[0];

        expect(typeof val.id).toBe('string');
        expect(val.createdAt).toBeInstanceOf(Date);
        expect(typeof val.price).toBe('number');
    });
});

describe('Update Course', () => {
    test('Updateing course with wrong data. ID not matching', async () => {
        const fakeData = makeFakeData();

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeData);

        const courseService = new CourseService();

        const wrongCourse: Course = { ...fakeData.courses[0] };

        wrongCourse.id = '234';

        await expect(
            courseService.updateCourse(wrongCourse),
        ).rejects.toThrowError('Course not found!');
    });

    test('Updateing course with correct data.', async () => {
        const fakeData = makeFakeData();

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeData);

        const courseService = new CourseService();

        const newCourse: Course = { ...fakeData.courses[0] };

        newCourse.price = 2;
        await courseService.updateCourse(newCourse);

        const [dataArg] = mockedFileProcessor.writeFile.mock.calls[0] as [
            CourseFile,
            string,
        ];

        expect(dataArg.courses[0].price).toBe(2);
        expect(mockedFileProcessor.writeFile).toBeCalledTimes(1);
    });
});

describe('Delete Course', () => {
    test('failing to delete the course', async () => {
        const fakeData = makeFakeData();

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeData);

        const courseService = new CourseService();

        await expect(courseService.deleteCourse('223')).rejects.toThrowError(
            'Course not found!',
        );
    });

    test('successfully delete Course', async () => {
        const fakeData = makeFakeData();

        mockedFileProcessor.getCompleteData.mockResolvedValue(fakeData);

        const courseService = new CourseService();

        await courseService.deleteCourse(fakeData.courses[0].id);

        expect(mockedFileProcessor.writeFile).toBeCalled();
    });
});
