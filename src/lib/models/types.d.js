/**
 * @global
 * @typedef {Object} CourseProps
 * @property {string} id - The id used internally to identify the course.
 * @property {string} semester - The semester in which the course takes place.
 * @property {string} lecturer - The lecturer who opened the course.
 * @property {string} lecturers - The course lecturers.
 * @property {SubjectProps} subject - The course subject.
 * @property {number} males - The number of male students enrolled in the course.
 * @property {number} females - The number of female students enrolled in the course.
 * @property {string} sessions - The sessions (weekly) in which the course takes place.
 * @property {string} classrooms - The classroom(s) in which the course takes place.
 * @property {string} remark - The course remark.
 */

/**
 * @global
 * @typedef {Object} SubjectProps
 * @property {string} id - The subject id.
 * @property {number} type - The subject type id.
 * @property {string} department - The subject department.
 * @property {string} grade - The subject grade.
 * @property {string} class - The subject class id.
 * @property {string} title_zh - The subject Zhongwen title.
 * @property {string} title_en - The subject English title.
 * @property {string} abstract_zh - The subject Zhongwen description.
 * @property {string} abstract_en - The subject English description.
 * @property {number} credits - The subject credits.
 * @property {string} weeks - The weeks during which the course takes place.
 */
