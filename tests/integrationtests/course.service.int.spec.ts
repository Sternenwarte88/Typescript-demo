import fs from 'fs';
import { afterAll, beforeEach, expect, test } from 'vitest';
import { ICourse } from '../../src/models/course.model';
import { CourseService } from '../../src/services/course.service';

const testPath: string = './tests/testfiles/testFile.test.json';

function makeFakeCourse(): ICourse {
    const fakeCourse: ICourse = {
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
});
afterAll(() => {
    if (fs.existsSync(testPath)) {
        fs.unlinkSync(testPath);
    }
});

test('Test if file could be read', async () => {
    const courseService = new CourseService(testPath);
    const fakeCourse = makeFakeCourse();

    await courseService.createCourse(fakeCourse);

    const allCourses = await courseService.getAllCourses();

    const getCourse = await courseService.getCourse(allCourses.courses[0].id);

    expect(getCourse).toBeDefined();
    expect(getCourse.name).toBe(fakeCourse.name);
});

test('Test if file could be deleted', async () => {
    const courseService = new CourseService(testPath);
    const fakeCourse = makeFakeCourse();

    await courseService.createCourse(fakeCourse);

    await courseService.deleteCourse(fakeCourse.id);

    await expect(courseService.getCourse(fakeCourse.id)).rejects.toThrow(
        'course is undefined',
    );

    const allCourses = await courseService.getAllCourses();

    expect(allCourses.courses.length).toBe(0);
});

test('Test if file could be updated', async () => {
    const courseService = new CourseService(testPath);
    const fakeCourse = makeFakeCourse();

    await courseService.createCourse(fakeCourse);

    const changedDescription = 'Another cool course Update';

    fakeCourse.description = changedDescription;

    await courseService.updateCourse(fakeCourse);

    const allCourses = await courseService.getAllCourses();

    expect(allCourses.courses.length).toBe(1);
    expect(allCourses.courses[0].description).toEqual(changedDescription);
});
