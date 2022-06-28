import Room from '$lib/models/room.js';
import Semester from '$lib/models/semester.js';
import Sessions from '$lib/models/sessions.js';
import { COURSE_SCHEMA } from '$lib/values/system.js';

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

	/** This returns the subject type. */
	get type() {
		return this.subject.type;
	}

	/** This returns the subject class. */
	get class() {
		return this.subject.class;
	}

	/** This returns the subject name. */
	get name() {
		return this.subject.name;
	}

	/** This returns the subject abstract. */
	get abstract() {
		return this.subject.abstract;
	}

	/** This returns the subject credits. */
	get credits() {
		return this.subject.credits;
	}

	/**
	 * This creates a Course instance from the QueryCourse system export format.
	 * @param {Object} props - A row in the spreadsheet exported from the QueryCourse system.
	 * @returns {Course} - The created Course instance.
	 */
	static create(props) {
		const semester = props[COURSE_SCHEMA.SEMESTER.remoteName];
		const sessions = Sessions.create(
			props[COURSE_SCHEMA.WEEKDAY.remoteName],
			props[COURSE_SCHEMA.SESSIONS.remoteName]
		);
		return new Course({
			semester: semester.slice(0, 3) + '-' + semester.slice(3),
			lecturer: props[COURSE_SCHEMA.LECT_NAME.remoteName],
			lecturers: props[COURSE_SCHEMA.LECT_NAMES.remoteName],
			subject: {
				id: props[COURSE_SCHEMA.SUBJ_ID.remoteName],
				type: parseInt(props[COURSE_SCHEMA.TYPE_ID.remoteName], 10),
				class: props[COURSE_SCHEMA.OLD_CLASS_NAME.remoteName],
				name: props[COURSE_SCHEMA.SUBJ_TITLE.remoteName],
				abstract: props[COURSE_SCHEMA.ABSTRACT.remoteName],
				credits: parseInt(props[COURSE_SCHEMA.CREDITS.remoteName], 10),
			},
			weeks: props[COURSE_SCHEMA.WEEKS.remoteName],
			sessions: sessions.join(','),
			room: props[COURSE_SCHEMA.CLASSROOM.remoteName],
			remark: props[COURSE_SCHEMA.REMARK.remoteName],
		});
	}
}

export default Course;
