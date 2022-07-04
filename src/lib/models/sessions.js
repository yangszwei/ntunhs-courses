/** The sessions in which a course takes place. */
class Sessions extends Array {
	/**
	 * This creates a Sessions instance from the string representation.
	 * @param str - The string representation of the session data.
	 * @returns {Sessions}
	 */
	static from(str) {
		return new Sessions(...str.split(',').map((s) => s.trim()));
	}

	/**
	 * This groups the sessions by consecutive sessions.
	 * @returns {{day: string, range: [string, string]}[]}
	 * */
	#group() {
		const table = new Array(WEEKDAY_NAMES.length).fill(null).map(() => []);
		for (const [day, session] of this.map((str) => [str[0], str[1]])) {
			table[day].push(session);
		}
		const groups = [];
		for (const day in table) {
			if (table[day].length === 0) continue;
			for (let start = 0, end = 1; end <= table[day].length; end++) {
				const cur = parseInt(table[day][end], 16);
				if (cur - 1 !== parseInt(table[day][end - 1], 16) || end === table[day].length) {
					groups.push({ day, range: [table[day][start], table[day][end - 1]] });
					start = end;
				}
			}
		}
		return groups;
	}

	/** This returns a human-readable string presentation of the session data. */
	prettyPrint(lang = 'zh') {
		const sb = [];
		const groups = new Array(WEEKDAY_NAMES.length).fill(null).map(() => []);
		for (const { day, range } of this.#group()) {
			const [from, to] = [parseInt(range[0], 16), parseInt(range[1], 16)];
			if (from === to) {
				groups[day].push(from.toString(10));
				continue;
			}
			groups[day].push(from.toString(10) + (from + 1 === to ? ', ' : '~') + to.toString(10));
		}
		for (const day in groups) {
			if (!groups[day].length) continue;
			if (lang === 'en') {
				sb.push(`${WEEKDAY_NAMES[day].short_en} ${groups[day].join(', ')}`);
			} else {
				sb.push(`${WEEKDAY_NAMES[day].zh} 第${groups[day].join(', ')}節`);
			}
		}
		return sb.join(lang === 'en' ? ' / ' : '、');
	}

	/**
	 * This returns a tabular representation of the session data.
	 * @param {Course[]} courses - The language of the table.
	 * @param {string} lang - The language of the table.
	 * @param {boolean} trim - Whether to trim the table.
	 * @returns {(Object|null)[][]}
	 * */
	static tabular(courses, lang = 'zh', trim = true) {
		const [DAY_LEN, SESS_LEN] = [WEEKDAY_NAMES.length, Object.keys(SESSION_TIMES).length];
		let table = [
			WEEKDAY_NAMES.map((day) => (lang === 'en' ? day.short_en : day.short_zh)),
			...new Array(SESS_LEN).fill(null).map(() => new Array(DAY_LEN).fill({ type: 0 })),
		];
		for (const course of courses) {
			for (const { day, range } of course.sessions.#group()) {
				const [from, to] = [parseInt(range[0], 16), parseInt(range[1], 16)];
				table[from][day] = { type: 1, from, to, course, rowspan: to - from + 1 };
				for (let i = from; i < to; i++) table[i + 1][day] = { type: -1 };
			}
		}
		if (trim) {
			if (table.slice(1).every((row) => !row[0].type && !row[6].type)) {
				table = table.map((x) => x.slice(1, -1));
			}
			if (table.slice(11, 15).every((row) => row.every((col) => !col.type))) {
				table.splice(11, 3);
			}
		}
		return table;
	}
}

/** Weekdays names. */
export const WEEKDAY_NAMES = Object.freeze([
	{ zh: '週日', short_zh: '日', en: 'Sunday', short_en: 'Sun.' },
	{ zh: '週一', short_zh: '一', en: 'Monday', short_en: 'Mon.' },
	{ zh: '週二', short_zh: '二', en: 'Tuesday', short_en: 'Tue.' },
	{ zh: '週三', short_zh: '三', en: 'Wednesday', short_en: 'Wed.' },
	{ zh: '週四', short_zh: '四', en: 'Thursday', short_en: 'Thu.' },
	{ zh: '週五', short_zh: '五', en: 'Friday', short_en: 'Fri.' },
	{ zh: '週六', short_zh: '六', en: 'Saturday', short_en: 'Sat.' },
]);

/** Course session times. */
export const SESSION_TIMES = Object.freeze({
	1: ['08:10', '09:00'],
	2: ['09:10', '10:00'],
	3: ['10:10', '11:00'],
	4: ['11:10', '12:00'],
	5: ['12:40', '13:30'],
	6: ['13:40', '14:30'],
	7: ['14:40', '15:30'],
	8: ['15:40', '16:30'],
	9: ['16:40', '17:30'],
	A: ['17:40', '18:30'],
	B: ['18:35', '19:25'],
	C: ['19:30', '20:20'],
	D: ['20:25', '21:15'],
	E: ['21:20', '22:10'],
});

export default Sessions;
