import PrismaClient from '$lib/js/prisma.js';

const prisma = new PrismaClient();

/** This gets the course data. */
export async function get() {
	let body = {};
	let status = 500;

	try {
		body = await prisma.course.findMany({ include: { subject: true } });
		status = 200;
	} catch (e) {
		console.error(e);
	}

	return { status, body };
}
