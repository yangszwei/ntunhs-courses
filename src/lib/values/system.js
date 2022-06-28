/** NTUNHS system address. */
export const SYSTEMS = Object.freeze({
	QUERY_COURSE:
		'https://system10.ntunhs.edu.tw/AcadInfoSystem/Modules/QueryCourse/QueryCourse.aspx',
});

/** Course property name & remote name. */
export const COURSE_SCHEMA = Object.freeze({
	SN: { remoteName: '編號' },
	SEMESTER: { name: 'semester', remoteName: '學期' },
	LECT_NAME: { name: 'lecturer', remoteName: '主開課教師姓名' },
	SUBJ_ID: { name: 'id', remoteName: '科目代碼(新碼全碼)' },
	DEPT_ID: { name: 'department', remoteName: '系所代碼' },
	CORE_ID: { name: 'core', remoteName: '核心四碼' },
	SUBJ_GROUP: { name: 'group', remoteName: '科目組別' },
	GRADE: { name: 'grade', remoteName: '年級' },
	CLASS: { name: 'class', remoteName: '上課班組' },
	SUBJ_TITLE: { name: 'name', remoteName: '科目中文名稱' },
	SUBJ_TITLE_EN: { name: 'name_en', remoteName: '科目英文名稱' },
	LECT_NAMES: { name: 'lecturers', remoteName: '授課教師姓名' },
	ENROLLMENTS: { name: 'enrollments', remoteName: '上課人數' },
	MALES_ENROLLED: { name: 'males', remoteName: '男學生上課人數' },
	FEMALES_ENROLLED: { name: 'females', remoteName: '女學生上課人數' },
	CREDITS: { name: 'credits', remoteName: '學分數' },
	WEEKS: { name: 'weeks', remoteName: '上課週次' },
	HOURS: { name: 'hours', remoteName: '上課時數/週' },
	TYPE_ID: { name: 'type', remoteName: '課別代碼' },
	TYPE_NAME: { remoteName: '課別名稱' },
	CLASSROOM: { name: 'room', remoteName: '上課地點' },
	WEEKDAY: { remoteName: '上課星期' },
	SESSIONS: { remoteName: '上課節次' },
	REMARK: { name: 'remark', remoteName: '課表備註' },
	ABSTRACT: { name: 'abstract', remoteName: '課程中文摘要' },
	ABSTRACT_EN: { name: 'abstract_en', remoteName: '課程英文摘要' },
	OBS_LECT_ID: { name: 'lecturerId', remoteName: '主開課教師代碼(舊碼)' },
	OLD_SUBJECT_ID: { remoteName: '科目代碼(舊碼)' },
	OLD_CLASS_ID: { remoteName: '課表代碼(舊碼)' },
	OLD_CLASS_NAME: { remoteName: '課表名稱(舊碼)' },
	OLD_LECT_IDS: { name: 'lecturerIds', remoteName: '授課教師代碼(舊碼)' },
});
