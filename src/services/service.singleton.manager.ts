import { CourseService } from './course.service.js';
import { UserService } from './user.service.js';

/**
 * The exported courseService singleton
 */
export const courseService = new CourseService();
/**
 * The exportet userService singleton
 */
export const userService = new UserService();
