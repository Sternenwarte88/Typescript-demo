import fs from 'fs';
import { Course } from '../models/course.model.js';
import fileProcessor from '../utils/fileProcessor.js';

class CourseService {
    private basePath: string = './courseData.json';
    constructor() {
        this.initMethod();
    }

    private async initMethod() {
        const fileExists = fs.existsSync(this.basePath);

        if (!fileExists) {
            const wrapper: { courses: Course[] } = { courses: [] };
            const serializedWrapper = JSON.stringify(wrapper, null, 2);

            await fileProcessor.writeFile(serializedWrapper, this.basePath);
        }
    }

    public getCourse() {}
    public getAllCourses() {}
    public createCourse() {}
    public updateCourse() {}
    public deleteCourse() {}
}

export default new CourseService();
