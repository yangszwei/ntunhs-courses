import { access } from 'fs/promises';
import { extractFilename } from '$lib/scripts/httputil.js';
import puppeteer from 'puppeteer';
import { resolve as resolvePath } from 'path';

/** The Query Course system URL. */
export const QUERY_COURSE_URL =
	'https://system10.ntunhs.edu.tw/AcadInfoSystem/Modules/QueryCourse/QueryCourse.aspx';

/**
 * This downloads the exported spreadsheet from the Query Course system.
 * @param {Object} filter - The filter for the course data query.
 * @param {string} filter.semester - The id of the semester to query.
 * @returns {Promise<string>} - The path to the downloaded spreadsheet.
 */
export async function getCourseData(filter) {
	const browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
	const page = await browser.newPage();
	const client = await page.target().createCDPSession();

	/** This configures the download path. */
	await client.send('Page.setDownloadBehavior', {
		behavior: 'allow',
		downloadPath: resolvePath('tmp'),
	});

	/** This opens the QueryCourse system. */
	await page.goto(QUERY_COURSE_URL, { waitUntil: 'networkidle2' });
	await page.setViewport({ width: 1920, height: 1080 });

	/** This applies the filter. */
	await page.select('#ContentPlaceHolder1_ddlSem', filter.semester);

	const predicate = (resp) => resp.url() === QUERY_COURSE_URL && resp.status() === 200;

	/** This submits the query. */
	await page.click('#ContentPlaceHolder1_btnQuery');
	await page.waitForResponse(predicate);
	await page.waitForNetworkIdle();

	/** This triggers an export of the query result. */
	await page.click('#ContentPlaceHolder1_imgExcel');
	const resp = await page.waitForResponse(predicate);
	await page.waitForNetworkIdle();

	await browser.close();

	/** This extracts the downloaded file path from the headers. */
	const headers = await resp.headers();
	const path = resolvePath('tmp', extractFilename(headers['content-disposition']));

	/** The makes sure the file exists and is accessible. */
	try {
		await access(path);
	} catch (err) {
		throw new Error(`File ${path} is not accessible.`);
	}

	return path;
}
