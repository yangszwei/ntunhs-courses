import Classroom from '$lib/models/classroom.js';
import Enrollments from '$lib/models/enrollments.js';
import Semester from '$lib/models/semester.js';
import Sessions from '$lib/models/sessions.js';
import Subject from '$lib/models/subject.js';

/** A course that is/was open for students to enroll in. */
class Course {
	/**
	 * @param {CourseProps} props - The course properties.
	 * */
	constructor(props) {
		/** The id used internally to identify the course. */
		this.id = props.id;
		/** The semester in which the course takes place. */
		this.semester = new Semester(props.semester);
		/* TODO: Create and adapt lecturer model. */
		/** The lecturer who opened the course. */
		this.lecturer = props.lecturer;
		/** The course lecturers. */
		this.lecturers = props.lecturers;
		/** The course subject. */
		this.subject = new Subject(props.subject);
		/** The number of students enrolled in the course. */
		this.enrollments = new Enrollments(props.males, props.females);
		/** The sessions (weekly) in which the course takes place. */
		this.sessions = Sessions.from(props.sessions);
		/** The classroom(s) in which the course takes place. */
		this.classrooms = Classroom.fromMany(props.classrooms);
		/** The course remark. */
		this.remark = props.remark;
	}

	/** This is a shortcut to get the subject title. */
	title(lang = 'zh') {
		return lang === 'en' ? this.subject.title_en : this.subject.title_zh;
	}

	/** This is a shortcut to get the subject abstract. */
	abstract(lang = 'zh') {
		return lang === 'en' ? this.subject.abstract_en : this.subject.abstract_zh;
	}
}

export default Course;
