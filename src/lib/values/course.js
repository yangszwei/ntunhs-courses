/** Campus buildings name. */
export const BUILDINGS = Object.freeze({
	B: { name: '親仁樓', campus: { name: '校本部', main: true } },
	G: { name: '教學大樓', campus: { name: '校本部', main: true } },
	S: { name: '科技大樓', campus: { name: '校本部', main: true } },
	L: { name: '圖書館', campus: { name: '校本部', main: true } },
	F: { name: '學思樓', campus: { name: '校本部', main: true } },
	I: { name: '樂育樓', campus: { name: '校本部', main: true } },
	R: { name: '長照大樓', campus: { name: '城區部', main: false } },
	C: { name: '文教大樓', campus: { name: '城區部', main: false } },
});

/** Course levels name & style. */
export const LEVELS = Object.freeze({
	1: { name: '入門', style: 'bg-blue-500 text-white' },
	2: { name: '基本', style: 'bg-green-500 text-white' },
	3: { name: '進階', style: 'bg-yellow-500 text-white' },
});

/** This is the indicator of a popular course. */
export const POPULAR = Object.freeze({
	name: '熱門課程',
	style: 'bg-red-500 text-white',
});

/** Semesters name. */
export const SEMESTERS = Object.freeze({
	1: { name: '上' },
	2: { name: '下' },
});

/** Sessions name & time. */
export const SESSIONS = Object.freeze({
	1: { name: '一', time: ['08:10', '09:00'] },
	2: { name: '二', time: ['09:10', '10:00'] },
	3: { name: '三', time: ['10:10', '11:00'] },
	4: { name: '四', time: ['11:10', '12:00'] },
	5: { name: '五', time: ['12:40', '13:30'] },
	6: { name: '六', time: ['13:40', '14:30'] },
	7: { name: '七', time: ['14:40', '15:30'] },
	8: { name: '八', time: ['15:40', '16:30'] },
	9: { name: '九', time: ['16:40', '17:30'] },
	A: { name: '十', time: ['17:40', '18:30'] },
	B: { name: '十一', time: ['18:35', '19:25'] },
	C: { name: '十二', time: ['19:30', '20:20'] },
	D: { name: '十三', time: ['20:25', '21:15'] },
	E: { name: '十四', time: ['21:20', '22:10'] },
});

/** Course types name. */
export const TYPES = Object.freeze({
	1: { name: '通識必修(通識)', style: 'bg-gray-200' },
	3: { name: '專業必修(系所)', style: 'bg-gray-200' },
	5: { name: '通識選修(通識)', style: 'bg-gray-200' },
	7: { name: '專業選修(系所)', style: 'bg-gray-200' },
});
