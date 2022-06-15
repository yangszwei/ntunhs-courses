import { SEMESTERS } from '$lib/values/course.js';

/** A period of time during which a course takes place. */
class Semester extends String {
	/** The returns a string representation of the semester. */
	get name() {
		const [year, sem] = this.split('-');
		return `${year}學年度${SEMESTERS[sem].name}學期`;
	}

	/** This returns a short string representation of the semester. */
	get shortName() {
		const [year, sem] = this.split('-');
		return `${year} ${SEMESTERS[sem].name}`;
	}
}

export default Semester;
