import * as xlsx from '$lib/scripts/xlsx.js';
import { COURSE_SCHEMA as SCHEMA, SYSTEMS } from '$lib/values/system.js';
import { existsSync, unlinkSync } from 'fs';
import Course from '$lib/models/course.js';
import Sessions from '$lib/models/sessions.js';
import puppeteer from 'puppeteer';
import { resolve } from 'path';

/**
 * This extracts the filename from the Content-Disposition header.
 * @param {string} value - The Content-Disposition header value.
 * @returns {string} - The filename.
 */
const extractFilename = (value) => decodeURIComponent(value.split('=')[1].replace(/"/g, ''));

/**
 * This fetches the course data from the QueryCourse system.
 * @param {string} semester - The semester of the course data to fetch.
 * @returns {Promise<string>} - A promise that resolves to the path of the downloaded spreadsheet.
 */
async function fetchCourseData(semester) {
	const browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
	const page = await browser.newPage();
	const client = await page.target().createCDPSession();
	await client.send('Page.setDownloadBehavior', {
		behavior: 'allow',
		downloadPath: resolve('tmp'),
	});

	/** Opens the QueryCourse system. */
	await page.goto(SYSTEMS.QUERY_COURSE, { waitUntil: 'networkidle2' });
	await page.setViewport({ width: 1920, height: 1080 });

	/** Applies the semester option. */
	await page.select('#ContentPlaceHolder1_ddlSem', semester);

	/** Submits the query. */
	await page.click('#ContentPlaceHolder1_btnQuery');
	await page.waitForResponse((resp) => resp.url() === SYSTEMS.QUERY_COURSE && resp.ok());
	await page.waitForNetworkIdle();

	/** Triggers an export of the query result. */
	await page.click('#ContentPlaceHolder1_imgExcel');
	const resp = await page.waitForResponse(
		(resp) => resp.url() === SYSTEMS.QUERY_COURSE && resp.ok(),
		{ timeout: 60000 }
	);
	await page.waitForNetworkIdle();
	await browser.close();

	/** Extracts the path from the headers. */
	const headers = await resp.headers();
	const path = resolve('tmp', extractFilename(headers['content-disposition']));

	/** Checks for the existence of the exported file. */
	if (!existsSync(path)) throw new Error(`File ${path} does not exist.`);

	return path;
}

/**
 * This extracts the course data from the exported spreadsheet.
 * @param {string} path - The path of the exported spreadsheet.
 * @returns {Course[]} - The extracted Course objects.
 */
function extractCourseData(path) {
	const workbook = xlsx.readFile(resolve(path));
	const sheet = workbook.Sheets[workbook.SheetNames[0]];
	const objects = xlsx.utils.sheet_to_json(sheet, { range: 4 });

	const courses = {};
	for (const obj of objects) {
		if (obj[SCHEMA.SUBJ_ID.remoteName] in courses) {
			const sessions = Sessions.create(
				obj[SCHEMA.WEEKDAY.remoteName],
				obj[SCHEMA.SESSIONS.remoteName]
			);
			courses[obj[SCHEMA.SUBJ_ID.remoteName]].sessions.push(...sessions);
			continue;
		}
		courses[obj[SCHEMA.SUBJ_ID.remoteName]] = Course.create(obj);
	}

	return Object.values(courses);
}

/**
 * This fetches the course data from the official QueryCourse service.
 * @param {string} semester - The semester of the course data to fetch.
 * @returns {Course[]} - The extracted Course objects.
 */
export async function getCourseData(semester) {
	const path = await fetchCourseData(semester);
	const data = extractCourseData(path);
	unlinkSync(resolve(path));
	return data;
}
