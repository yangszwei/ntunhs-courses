/** Course highlight. */
const HIGHLIGHT = {
	popular: { name: '熱門課程', style: 'bg-red-500 text-white' },
};

/** Course level. */
const LEVEL = {
	introductory: { name: '入門課程', style: 'bg-blue-500 text-white' },
	fundamental: { name: '基礎課程', style: 'bg-green-500 text-white' },
	advanced: { name: '進階課程', style: 'bg-yellow-500 text-white' },
};

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
		this.time = new Time(...props.time);
		/** Classroom (location) where the course takes place. */
		this.room = props.room;
		/** Remark for the course offer. */
		this.remark = props.remark;
		/** Credits that can be earned from the course. */
		this.credits = props.credits;
	}

	/** This returns main lecturer of the course. */
	get lecturer() {
		return this.lecturers[0];
	}
}

/** Time records the weekday & sessions when a course takes place. */
class Time extends Array {
	/** Weekday names. */
	static get WEEKDAY() {
		return ['日', '一', '二', '三', '四', '五', '六'];
	}

	/** This prints the session name in human-readable format. */
	static toSessionName(hex) {
		const numbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
		const num = parseInt(hex, 16);
		return num > 10 ? '十' + numbers[num % 10] : numbers[num];
	}

	/** This prints the course time in human-readable format. */
	prettyPrint() {
		const result = [];
		const subset = {};
		for (const [day, session] of this.map((s) => [parseInt(s[0]), parseInt(s[1], 16)])) {
			subset[day] = subset[day] || [];
			subset[day].push(session);
		}
		for (const day in subset) {
			const res = [];
			let start = 0;
			for (let end = 1; end <= subset[day].length; end++) {
				if (subset[day][end] !== subset[day][end - 1] + 1 || end === subset[day].length) {
					const slice = subset[day].slice(start, end);
					res.push(
						slice.length === 1
							? Time.toSessionName(slice[0])
							: [slice[0], slice[slice.length - 1]]
									.map(Time.toSessionName)
									.join(slice.length > 2 ? '～' : '、')
					);
					start = end;
				}
			}
			result.push(
				`週${Time.WEEKDAY[day]}&nbsp;&nbsp;` +
					`${subset.length === 1 ? '第' : ''}${res.join('、')}節`
			);
		}
		return result.join('、');
	}
}

export { HIGHLIGHT, LEVEL, Course };
