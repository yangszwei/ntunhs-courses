import { WEEKDAYS } from '$lib/values/common.js';
import { SESSIONS } from '$lib/values/course.js';

/** A collection of sessions. */
class Sessions extends Array {
	/**
	 * This groups the sessions with consecutive weekdays/sessions.
	 * @returns {{ day: string, start: string, end: string }[]}
	 */
	group() {
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

	/** This returns a human-readable string presentation of the sessions data. */
	prettyPrint() {
		const result = [];
		const sess = new Array(7).fill(null).map(() => []);
		for (const { day, start, end } of this.group()) {
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

export default Sessions;
