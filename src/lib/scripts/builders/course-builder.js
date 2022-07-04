import * as xlsx from '$lib/scripts/xlsx.js';
import { resolve as resolvePath } from 'path';

/** This is responsible for extracting data from the course data spreadsheet. */
class CourseBuilder {
	/**
	 * This reads the data from the downloaded spreadsheet.
	 * @param path - The path of the downloaded spreadsheet.
	 * @returns {Object[]}
	 */
	static open(path) {
		const workbook = xlsx.readFile(resolvePath(path));
		const sheet = workbook.Sheets[workbook.SheetNames[0]];
		return xlsx.utils.sheet_to_json(sheet, { range: 4 });
	}

	/**
	 * This constructs CourseProps objects from the downloaded spreadsheet.
	 * @param data
	 * @returns {CourseProps[]}
	 */
	static build(data) {
		const courses = {};
		for (const row of data) {
			const subjectId = row['科目代碼(新碼全碼)'];
			if (Object.hasOwn(courses, subjectId)) {
				const sessions = this.#createSessions(row['上課星期'], row['上課節次']);
				courses[subjectId].sessions += ',' + sessions;
				continue;
			}
			courses[subjectId] = {
				id: `${row['學期']}:${subjectId}`,
				semester: row['學期'],
				lecturer: row['主開課教師姓名'],
				lecturers: row['授課教師姓名'],
				subject: {
					id: row['科目代碼(新碼全碼)'],
					type: parseInt(row['課別代碼'], 10),
					department: row['系所代碼'],
					grade: row['年級'],
					class: row['課表名稱(舊碼)'],
					title_zh: row['科目中文名稱'],
					title_en: row['科目英文名稱'],
					abstract_zh: row['課程中文摘要'],
					abstract_en: row['課程英文摘要'],
					credits: parseInt(row['學分數'], 10),
					weeks: row['上課週次'],
				},
				males: parseInt(row['男學生上課人數'], 10),
				females: parseInt(row['女學生上課人數'], 10),
				sessions: this.#createSessions(row['上課星期'], row['上課節次']),
				classrooms: row['上課地點'],
				remark: row['課表備註'],
			};
		}
		return Object.values(courses);
	}

	/**
	 * This creates a string representation of the sessions.
	 * @param {string} weekday - The weekday.
	 * @param {string} sessions - The sessions.
	 * @returns {string}
	 */
	static #createSessions(weekday, sessions) {
		const day = (parseInt(weekday, 10) % 7).toString(10);
		return sessions
			.split(',')
			.map((s) => day + parseInt(s, 10).toString(16).toUpperCase())
			.join(',');
	}
}

export default CourseBuilder;
