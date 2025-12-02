import fs from 'fs';
import { expect, test } from 'vitest';
import { ICourse } from '../../src/models/course.model';
import { CourseService } from '../../src/services/course.service';

const testPath: string = './tests/testFile.test.json';

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

test('', () => {
    const courseService = new CourseService(testPath);
    const fakeCourse = makeFakeCourse();

    courseService.createCourse(fakeCourse);
    expect(fs.existsSync(testPath)).toBeTruthy;
});
