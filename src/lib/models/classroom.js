import BUILDINGS from '$lib/values/buildings.json';

/** A single classroom in which a course takes place. */
class Classroom extends String {
	/** The classroom id patterns. */
	static #PATTERNS = Object.freeze([
		/** This matches classrooms in the basement. */
		{
			matcher: /^[BGSLFIRC]B\d{2,3}$/g,
			format: (str, bldg, lang) => `${bldg} ${lang === 'en' ? `B${str[2]}` : `地下${str[2]}樓`}`,
		},
		/** This matches classrooms above floor 10. */
		{
			matcher: /^F1\d{3}$/g,
			format: (str, bldg, lang) => `${bldg} ${str.slice(1, 3)}${lang === 'en' ? 'F' : '樓'}`,
		},
		/** This matches classrooms in floor 1 ~ 9. */
		{
			matcher: /^[BGSLFIRC]\d{3,4}$/g,
			format: (str, bldg, lang) => `${bldg} ${str[1]}${lang === 'en' ? 'F' : '樓'}`,
		},
	]);

	/**
	 * This creates a list of Classroom instances from the ids.
	 * @param ids - A comma-separated list of classroom ids.
	 * @return {Classroom[]} - A list of Classroom instances.
	 */
	static fromMany(ids) {
		return ids.split(',').map((id) => new Classroom(id));
	}

	/**
	 * This gets the approximate location of the classroom.
	 * @return {string}
	 */
	location(lang = 'zh') {
		for (const { matcher, format } of Classroom.#PATTERNS) {
			if (this.match(matcher)) {
				return format(this, BUILDINGS[this[0]]['name_' + lang], lang);
			}
		}
		return '';
	}
}

export default Classroom;
