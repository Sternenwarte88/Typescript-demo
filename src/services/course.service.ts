import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { Course } from '../models/course.model.js';
import { CourseFile } from '../models/courseFile.model.js';
import fileProcessor from '../utils/fileProcessor.js';

export class CourseService {
    /**
     *
     * @param basePath This constructor takes in an path for overwriting the default. Usecases would be tests for example.
     */
    constructor(
        private basePath: string = this.basePath ?? './courseData.json',
    ) {
        this.initMethod();
    }

    /**
     * This method checks if the file for courses exists. If not, then it get created
     */
    private initMethod() {
        const fileExists = fs.existsSync(this.basePath);

        if (!fileExists) {
            const wrapper: { courses: Course[] } = { courses: [] };
            const serializedWrapper = JSON.stringify(wrapper, null, 2);

            fileProcessor.writeFile(serializedWrapper, this.basePath);
        }
    }

    /**
     * This Method reaches out to the fileProcessor and try to get all courses from the file.
     * @returns
     */
    public async getAllCourses(): Promise<CourseFile> {
        const data = await fileProcessor.getCompleteData<CourseFile>(
            this.basePath,
        );

        if (!data) {
            throw new Error(`Course not found`);
        }

        return data;
    }

    /**
     * This method reaches out to the fileProcessor and tries to get the course with the provided ID
     * @param id The ID from the course, which should be looked up
     * @returns It returns an Course
     * @throws An Error when the course couldn´t be found
     */
    public async getCourse(id: string): Promise<Course> {
        const data = await this.getAllCourses();
        const courses: Course[] = data.courses;
        const course: Course | undefined = courses.find((c) => c.id === id);

        if (course === undefined) {
            throw new Error('course is undefined');
        }

        return course;
    }

    /**
     * This method reaches out to the fileProcessor and tries to write the new course into the file.
     * @param course The Course which gets written to file
     */
    public async createCourse(course: Course): Promise<void> {
        const courseFile = await this.getAllCourses();
        const courses = courseFile.courses;

        course.id = uuid();
        course.createdAt = new Date();
        course.updateAt = course.createdAt;
        courses.push(course);
        courseFile.courses = courses;
        fileProcessor.writeFile(courseFile, this.basePath);
    }

    /**
     * This method tries to update the specific course in the file
     * @param course The Course Data to update
     * @returns returns the new courseFile
     */
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

        fileProcessor.writeFile(courseFile, this.basePath);

        return courseFile;
    }

    /**
     * This method tries to delete the course with the provided ID
     * @param id The ID from the course which should be deleted
     * @throws throws an Error if the course could not be found
     */
    public async deleteCourse(id: string) {
        const courseFile = await this.getAllCourses();
        const courses = courseFile.courses;
        const courseIndex: number = courses.findIndex((c) => c.id === id);

        if (courseIndex === -1) {
            throw new Error('Index not found!');
        }

        courses.splice(courseIndex, 1);
        courseFile.courses = courses;
        fileProcessor.writeFile(courseFile, this.basePath);
    }
}
