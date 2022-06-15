import Room from '$lib/models/room.js';
import Semester from '$lib/models/semester.js';
import Sessions from '$lib/models/sessions.js';

/** A course that students can enroll in. */
class Course {
	/**
	 * @param {object} props
	 * @param {number} props.id - The id used to identify the course.
	 * @param {string} props.semester - The semester in which the course takes place.
	 * @param {boolean} props.isPopular - This indicates whether the course is popular.
	 * @param {number} props.level - The difficulty level of the course.
	 * @param {string} props.lecturer - The name of the lecturer offering the course.
	 * @param {string} props.lecturers - The names of all lecturers of the course.
	 * @param {object} props.subject - The course subject.
	 * @param {string} props.weeks - The weeks in which the course takes place.
	 * @param {string} props.sessions - The sessions in which the course takes place. (weekly)
	 * @param {string} props.room - The classroom in which the course takes place.
	 * @param {string} props.remark - The course remark.
	 */
	constructor(props) {
		/** The id used to identify the course. */
		this.id = props.id;
		/** The semester in which the course takes place. */
		this.semester = new Semester(props.semester);
		/** This indicates whether the course is popular. */
		this.isPopular = props.isPopular;
		/** The difficulty level of the course. */
		this.level = props.level;
		/** The name of the lecturer offering the course. */
		this.lecturer = props.lecturer;
		/** The names of all lecturers of the course. */
		this.lecturers = props.lecturers.split(',');
		/** The course subject. */
		this.subject = props.subject;
		/** The weeks in which the course takes place. */
		this.weeks = props.weeks;
		/** The sessions in which the course takes place. (weekly) */
		this.sessions = new Sessions(...props.sessions.split(','));
		/** The classroom in which the course takes place. */
		this.room = new Room(props.room);
		/** The course remark. */
		this.remark = props.remark;
	}
}

export default Course;
