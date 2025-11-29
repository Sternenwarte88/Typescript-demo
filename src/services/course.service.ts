import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { ICourse } from '../models/course.model.js';
import { CourseFile } from '../models/courseFile.model.js';
import fileProcessor from '../utils/fileProcessor.js';

class CourseService {
    private basePath: string = './courseData.json';
    constructor() {
        this.initMethod();
    }

    private async initMethod() {
        const fileExists = fs.existsSync(this.basePath);

        if (!fileExists) {
            const wrapper: { courses: ICourse[] } = { courses: [] };
            const serializedWrapper = JSON.stringify(wrapper, null, 2);

            await fileProcessor.writeFile(serializedWrapper, this.basePath);
        }
    }

    public async getAllCourses(): Promise<CourseFile> {
        const data = await fileProcessor.getCompleteData<CourseFile>(
            this.basePath,
        );

        if (!data) {
            throw new Error(`Course not found`);
        }

        return data;
    }

    public async getCourse(id: string): Promise<ICourse> {
        const data = await this.getAllCourses();
        const courses: ICourse[] = data.courses;
        const course: ICourse | undefined = courses.find((c) => c.id === id);

        if (course === undefined) {
            throw new Error('course is undefined');
        }

        return course;
    }

    public async createCourse(course: ICourse): Promise<void> {
        const courseFile = await this.getAllCourses();
        const courses = courseFile.courses;

        course.id = uuid();
        course.createdAt = new Date();
        course.updateAt = course.createdAt;
        courses.push(course);
        courseFile.courses = courses;
        await fileProcessor.writeFile(courseFile, this.basePath);
    }

    public async updateCourse(course: ICourse): Promise<CourseFile> {
        const courseFile = await this.getAllCourses();
        const courses = courseFile.courses;
        const courseIndex: number = courses.findIndex(
            (c) => c.id === course.id,
        );

        if (courseIndex === -1) {
            throw new Error('Index not found!');
        }

        courses[courseIndex].author = course.author;
        courses[courseIndex].description = course.description;
        courses[courseIndex].name = course.name;
        courses[courseIndex].price = course.price;
        courses[courseIndex].tags = course.tags;
        courses[courseIndex].updateAt = new Date();

        courseFile.courses = courses;

        await fileProcessor.writeFile(courseFile, this.basePath);

        return courseFile;
    }
    public async deleteCourse(id: string) {
        const courseFile = await this.getAllCourses();
        const courses = courseFile.courses;
        const courseIndex: number = courses.findIndex((c) => c.id === id);

        if (courseIndex === -1) {
            throw new Error('Index not found!');
        }

        courses.splice(courseIndex, 1);
        courseFile.courses = courses;
        await fileProcessor.writeFile(courseFile, this.basePath);
    }
}

export const courseService = new CourseService();
// For testing
export { CourseService };
