/** A period of time during which a course takes place. */
class Semester extends String {
	/** This returns a string representation of the semester. */
	get name() {
		return `${this.year}學年度${SEMESTER_NAMES[this.id]}學期`;
	}

	/** This returns a shorter string representation of the semester. */
	get shortName() {
		return `${this.year} ${SEMESTER_NAMES[this.id]}`;
	}

	/** This gets the academic year of the semester. */
	get year() {
		return this.substring(0, 3);
	}

	/** This gets the id (in the academic year) of the semester. */
	get id() {
		return this.substring(3);
	}
}

/** Semesters names. */
export const SEMESTER_NAMES = Object.freeze({
	1: '上',
	2: '下',
});

export default Semester;
