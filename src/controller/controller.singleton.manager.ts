import { CourseController } from './course.controller.js';
import { UserController } from './user.controller.js';

/**
 * The exported singleton for CourseController
 */
export const courseController = new CourseController();
/**
 * The exported singleton for UserController
 */
export const userController = new UserController();
