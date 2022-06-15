import { BUILDINGS } from '$lib/values/course.js';

/** A classroom in the campus. */
class Room extends String {
	/** The returns the approximate location of the classroom. */
	describe() {
		return this.split(',')
			.map((room) => {
				if (room.match(/[BGSLFIRC]B\d{2,3}/g)) {
					return `${BUILDINGS[room[0]].name} 地下室`;
				} else if (room.match(/[BGSLFIRC]\d{3,4}/g)) {
					return `${BUILDINGS[room[0]].name} ${room[1]}樓`;
				}
				return false;
			})
			.filter((room) => !!room)
			.join('、');
	}
}

export default Room;
