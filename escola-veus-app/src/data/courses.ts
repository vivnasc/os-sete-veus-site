/**
 * Re-exports course data from the parent repo (src/data/courses.ts).
 * The parent file imports from "@/types/course" which resolves to our
 * local src/types/course.ts (identical types).
 */
export { default as COURSES, getCourseBySlug, getAllCourses, getAllCourseSlugs } from "../../../src/data/courses";
export type { CourseData, CourseSlug, CourseModule, SubLesson } from "@/types/course";
