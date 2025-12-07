import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { Course } from '../models/course.model.js';
import { CourseFile } from '../models/courseFile.model.js';
import fileProcessor from '../utils/fileProcessor.js';

class CourseService {
    constructor(
        private basePath: string = this.basePath ?? './courseData.json',
    ) {
        this.initMethod();
    }

    private initMethod() {
        const fileExists = fs.existsSync(this.basePath);

        if (!fileExists) {
            const wrapper: { courses: Course[] } = { courses: [] };
            const serializedWrapper = JSON.stringify(wrapper, null, 2);

            fileProcessor.writeFile(serializedWrapper, this.basePath);
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

    public async getCourse(id: string): Promise<Course> {
        const data = await this.getAllCourses();
        const courses: Course[] = data.courses;
        const course: Course | undefined = courses.find((c) => c.id === id);

        if (course === undefined) {
            throw new Error('course is undefined');
        }

        return course;
    }

    public async createCourse(course: Course): Promise<void> {
        const courseFile = await this.getAllCourses();
        const courses = courseFile.courses;

        course.id = uuid();
        course.createdAt = new Date();
        course.updateAt = course.createdAt;
        courses.push(course);
        courseFile.courses = courses;
        await fileProcessor.writeFile(courseFile, this.basePath);
    }

    public async updateCourse(course: Course): Promise<CourseFile> {
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
export { CourseService };
