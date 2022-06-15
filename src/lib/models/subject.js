/** A subject taught in a course. */
class Subject {
	/**
	 * @param {object} props
	 * @param {string} props.id - The subject id.
	 * @param {number} props.type - The subject type.
	 * @param {string} props.class - The subject class.
	 * @param {string} props.name - The subject name.
	 * @param {string} props.abstract - A brief description of the subject.
	 * @param {number} props.credits - The subject credits.
	 */
	constructor(props) {
		/** The subject id. */
		this.id = props.id;
		/** The subject type. */
		this.type = props.type;
		/** The subject class. */
		this.class = props.class;
		/** The subject name. */
		this.name = props.name;
		/** A brief description of the subject. */
		this.abstract = props.abstract;
		/** The subject credits. */
		this.credits = props.credits;
	}
}

export default Subject;
