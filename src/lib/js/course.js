import { WEEKDAYS } from '$lib/values/common.js';
import { SESSIONS } from '$lib/values/course.js';

/** A course at school with a particular subject. */
class Course {
	/** The course highlight ids. */
	static get highlights() {
		return {
			POPULAR: 'popular',
		};
	}

	/** The course level ids. */
	static get levels() {
		return {
			INTRODUCTORY: 1,
			FUNDAMENTAL: 2,
			ADVANCED: 3,
		};
	}

	/**
	 * @param {Object} props - The course data.
	 * @param {string} props.id - The course id.
	 * @param {string} props.semester - Semester in which the course takes place.
	 * @param {string[]} props.highlights - Highlights of the course.
	 * @param {number} props.level - Degree of difficulty of the course.
	 * @param {string[]} props.lecturers - The lecturers of the course, first one is the main.
	 * @param {Object} props.subject - The subject of the course.
	 * @param {string} props.abstract - A brief description on the course.
	 * @param {string} props.weeks - The weeks that when the course takes place.
	 * @param {string[]} props.time - The weekly time when the course takes place.
	 * @param {string} props.room - Classroom (location) where the course takes place.
	 * @param {string} props.remark - Remark for the course.
	 * @param {number} props.credits - Credits that can be earned from the course.
	 */
	constructor(props) {
		/** The course id. */
		this.id = props.id;
		/** Semester in which the course takes place. */
		this.semester = props.semester;
		/** Highlights of the course. */
		this.highlights = props.highlights;
		/** Degree of difficulty of the course. */
		this.level = props.level;
		/** The lecturers of the course, first one is the main. */
		this.lecturers = props.lecturers;
		/** The subject of the course. */
		this.subject = new Subject(props.subject);
		/** A brief description on the course. */
		this.abstract = props.abstract;
		/** The weeks that when the course takes place. */
		this.weeks = props.weeks;
		/** The weekly time when the course takes place. */
		this.time = new Sessions(...props.time);
		/** Classroom (location) where the course takes place. */
		this.room = props.room;
		/** Remark for the course. */
		this.remark = props.remark;
		/** Credits that can be earned from taking the course. */
		this.credits = props.credits;
	}

	/** The main lecturer of the course. */
	get lecturer() {
		return this.lecturers[0];
	}

	/** The type of the course subject. */
	get type() {
		return this.subject.type;
	}

	/** The subject name. */
	get name() {
		return this.subject.name;
	}

	/** The class that will be taking the course. */
	get class() {
		return this.subject.class;
	}
}

/** The subject for a course. */
class Subject {
	/**
	 * @param {Object} props - The subject data.
	 * @param {string} props.id - The subject id.
	 * @param {number} props.type - The subject type.
	 * @param {string} props.name - The subject name.
	 * @param {string} props.class - The class that the subject belongs to.
	 */
	constructor(props) {
		/** The subject id.	*/
		this.id = props.id;
		/** The subject type. */
		this.type = props.type;
		/** The subject name. */
		this.name = props.name;
		/** The class that the subject belongs to. */
		this.class = props.class;
	}
}

/** Sessions records the weekday and sessions when a course takes place. */
class Sessions extends Array {
	/**
	 * This groups the sessions with consecutive weekdays/sessions.
	 * @returns {{ day: string, start: string, end: string }[]}
	 */
	sort() {
		/** This groups the sessions by weekday. */
		const sess = new Array(7).fill(null).map(() => []);
		this.map((t) => t.split('')).forEach(([w, s]) => sess[w].push(s));
		/** This splits the sessions into consecutive groups. */
		const result = [];
		for (const d in sess) {
			if (!sess[d].length) continue;
			let start = 0;
			for (let end = 1; end <= sess[d].length; end++) {
				if (
					parseInt(sess[d][end - 1], 16) + 1 !== parseInt(sess[d][end], 16) ||
					end === sess[d].length
				) {
					result.push({ day: d, start: sess[d][start], end: sess[d][end - 1] });
					start = end;
				}
			}
		}
		return result;
	}

	/**
	 * This returns a human-readable string presentation of the sessions data.
	 * @returns {string}
	 */
	prettyPrint() {
		const result = [];
		const sess = new Array(7).fill(null).map(() => []);
		for (const { day, start, end } of this.sort()) {
			const sep = parseInt(start, 16) === parseInt(end, 16) - 1 ? '、' : '～';
			sess[day].push(SESSIONS[start].name + (start !== end ? sep + SESSIONS[end].name : ''));
		}
		for (const d in sess) {
			if (!sess[d].length) continue;
			result.push(`週${WEEKDAYS[d]} 第${sess[d].join('、')}節`);
		}
		return result.join('、');
	}
}

export { Course };
