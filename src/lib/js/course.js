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

/** Weekday names. **/
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

/** Session start/end times. **/
const SESSIONS = [
	['08:10', '09:00'],
	['09:10', '10:00'],
	['10:10', '11:00'],
	['11:10', '12:00'],
	['12:40', '13:30'],
	['13:40', '14:30'],
	['14:40', '15:30'],
	['15:40', '16:30'],
	['16:40', '17:30'],
	['17:40', '18:30'],
	['18:35', '19:25'],
	['19:30', '20:20'],
	['20:25', '21:15'],
	['21:20', '22:10'],
];

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
	/** This prints the session name in human-readable format. */
	static toSessionName(hex) {
		const numbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
		const num = parseInt(hex, 16);
		return num > 10 ? '十' + numbers[num % 10] : numbers[num];
	}

	/**
	 * This splits the course time into consecutive subsequences.
	 * @returns {{day: string, start: number, end: number}[]}
	 * */
	group() {
		const sess = new Array(7).fill(null).map(() => []);
		for (const [day, session] of this.map((s) => [s[0], parseInt(s[1], 16)]))
			sess[day].push(session);
		const result = [];
		for (const day in sess) {
			if (sess[day].length === 0) continue;
			let start = 0;
			for (let end = 1; end <= sess[day].length; end++)
				if (sess[day][end] !== sess[day][end - 1] + 1 || sess.length === end) {
					result.push({
						day,
						start: sess[day][start],
						end: sess[day][sess.length === end ? end : end - 1],
					});
					start = end;
				}
		}
		return result;
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
				`週${WEEKDAYS[day]}&nbsp;&nbsp;` + `${subset.length === 1 ? '第' : ''}${res.join('、')}節`
			);
		}
		return result.join('、');
	}
}

export { HIGHLIGHT, LEVEL, WEEKDAYS, SESSIONS, Course };
