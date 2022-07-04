/** The number of students enrolled in a course. */
class Enrollments {
	/**
	 * @param {number} males - The number of male students enrolled in the course.
	 * @param {number} females - The number of female students enrolled in the course.
	 */
	constructor(males, females) {
		this.males = males;
		this.females = females;
	}

	/**
	 * This gets the total number of enrollments.
	 * @returns {number}
	 * */
	get count() {
		return this.males + this.females;
	}
}

export default Enrollments;
