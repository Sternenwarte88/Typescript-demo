import fs from 'fs';
import { afterAll, beforeEach, describe, expect, test } from 'vitest';
import { Course } from '../../src/models/course.model';
import { CourseService } from '../../src/services/course.service';

let counter = 0;
let testPath: string = `./tests/testfiles/testFile_course_${counter}.test.json`;

function makeFakeCourse(): Course {
    const fakeCourse: Course = {
        author: 'Stephan',
        createdAt: new Date(),
        description: 'blablabala',
        id: '2434',
        name: 'test',
        price: 2,
        tags: ['fake', 'data'],
    };

    return fakeCourse;
}

beforeEach(() => {
    if (fs.existsSync(testPath)) {
        fs.unlinkSync(testPath);
    }

    counter++;

    testPath = `./tests/testfiles/testFile_course_${counter}.test.json`;
});

afterAll(() => {
    if (fs.existsSync(testPath)) {
        fs.unlinkSync(testPath);
    }
});

describe('Create Course', () => {
    test('Test if course could be created', async () => {
        const fakeCourse = makeFakeCourse();

        const courseService = new CourseService(testPath);

        await courseService.createCourse(fakeCourse);

        const allCourses = await courseService.getAllCourses();

        const getCourse = await courseService.getCourse(
            allCourses.courses[0].id,
        );

        expect(getCourse).toBeDefined();
        expect(getCourse.name).toBe(fakeCourse.name);
    });
});

describe('Delete Course', () => {
    test('Test if course could be deleted', async () => {
        const courseService = new CourseService(testPath);
        const fakeCourse = makeFakeCourse();

        await courseService.createCourse(fakeCourse);

        const savedCourse = await courseService.getAllCourses();
        const course = savedCourse.courses[0];

        await courseService.deleteCourse(course.id);

        await expect(courseService.getCourse(course.id)).rejects.toThrow(
            'course is undefined',
        );

        const allCourses = await courseService.getAllCourses();

        expect(allCourses.courses.length).toBe(0);
    });

    test('Test if course couldn´t be deleted', async () => {
        const courseService = new CourseService(testPath);
        const fakeCourse = makeFakeCourse();

        await courseService.createCourse(fakeCourse);

        await expect(courseService.deleteCourse('234')).rejects.toThrowError(
            'Course not found!',
        );
    });
});

describe('Course Update', () => {
    test('Test if file could be updated', async () => {
        const fakeCourse = makeFakeCourse();

        const courseService = new CourseService(testPath);

        await courseService.createCourse(fakeCourse);

        const savedCourse = await courseService.getAllCourses();
        const course = savedCourse.courses[0];

        const changedDescription = 'Another cool course Update';

        course.description = changedDescription;

        await courseService.updateCourse(course);

        const allCourses = await courseService.getAllCourses();

        expect(allCourses.courses.length).toBe(1);
        expect(allCourses.courses[0].description).toEqual(changedDescription);
    });

    test('Test if file couldn´t be updated', async () => {
        const fakeCourse = makeFakeCourse();

        const courseService = new CourseService(testPath);

        await courseService.createCourse(fakeCourse);

        fakeCourse.id = 'ser';

        await expect(
            courseService.updateCourse(fakeCourse),
        ).rejects.toThrowError('Course not found!');
    });
});
