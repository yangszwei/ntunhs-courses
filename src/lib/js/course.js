/** A course with a particular subject held at the school. */
class Course {
	/**
	 * @param props
	 * @param {string} props.name - Name of the course subject.
	 * @param {string[]} props.lecturers - Lecturers of the course, first one is the main.
	 * @param {string[]} props.highlights - Highlights of the course.
	 * @param {string} props.level - Degree of difficulty of the course.
	 * @param {string} props.abstract - A brief description on the course.
	 * @param {string} props.type - Type of the course.
	 * @param {string} props.class - Class which the course is mainly for.
	 * @param {string} props.semester - Semester in which the course takes place.
	 * @param {string} props.weeks - Weeks the course takes place.
	 * @param {string[]} props.time - Weekly time (weekday & session) when the course takes place.
	 * @param {string} props.room - Classroom (location) where the course takes place.
	 * @param {string} props.remark - Remark for the course offer.
	 * @param {number} props.credits - Credits that can be earned from the course.
	 */
	constructor(props) {
		/** Name of the course subject. */
		this.name = props.name;
		/** Lecturers of the course, first one is the main. */
		this.lecturers = props.lecturers;
		/** Highlights of the course. */
		this.highlights = props.highlights;
		/** Degree of difficulty of the course. */
		this.level = props.level;
		/** A brief description on the course. */
		this.abstract = props.abstract;
		/** Type of the course. */
		this.type = props.type;
		/** Class which the course is mainly for. */
		this.class = props.class;
		/** Semester in which the course takes place. */
		this.semester = props.semester;
		/** Weeks the course takes place. */
		this.weeks = props.weeks;
		/** Weekly time (weekday & session) when the course takes place. */
		this.time = props.time;
		/** Classroom (location) where the course takes place. */
		this.room = props.room;
		/** Remark for the course offer. */
		this.remark = props.remark;
		/** Credits that can be earned from the course. */
		this.credits = props.credits;
	}
}

export { Course };
