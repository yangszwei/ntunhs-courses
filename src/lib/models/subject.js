import DEPARTMENTS from '$lib/values/departments.json';

/** The information used across academic years to create courses. */
class Subject {
	/**
	 * @param {SubjectProps} props - The subject properties.
	 * */
	constructor(props) {
		/** The subject id. */
		this.id = props.id;
		/** The subject type id. */
		this.type = props.type;
		/** The subject department. */
		this.department = props.department;
		/** The subject grade. */
		this.grade = props.grade;
		/** The subject class id. */
		this.class = props.class;
		/** The subject Zhongwen title. */
		this.title_zh = props.title_zh;
		/** The subject English title. */
		this.title_en = props.title_en;
		/** The subject Zhongwen abstract. */
		this.abstract_zh = props.abstract_zh;
		/** The subject English abstract. */
		this.abstract_en = props.abstract_en;
		/** The subject credits. */
		this.credits = props.credits;
		/** The weeks during which the course takes place. */
		this.weeks = props.weeks;
	}

	/**
	 * This gets the subject type names.
	 * @returns {{ name: string, shortName: string }}
	 * */
	get typeName() {
		return SUBJECT_TYPES[this.type] ?? { name: '未知的課別', shortName: '未知的課別' };
	}

	/**
	 * This gets the subject department name.
	 * @returns {string}
	 */
	get deptName() {
		return DEPARTMENTS[this.department] ?? '未知的系所';
	}
}

/* TODO: Add English Subject type names. */
/** Subject types. */
export const SUBJECT_TYPES = Object.freeze({
	1: { name: '通識必修(通識)', shortName: '通識必修' },
	3: { name: '專業必修(系所)', shortName: '專業必修' },
	5: { name: '通識選修(通識)', shortName: '通識選修' },
	7: { name: '專業選修(系所)', shortName: '專業選修' },
});

export default Subject;
