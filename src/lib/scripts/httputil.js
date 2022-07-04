/**
 * This extracts the filename from the Content-Disposition header.
 * @param {string} value - The Content-Disposition header value.
 * @returns {string} - The filename.
 */
export function extractFilename(value) {
	return decodeURIComponent(value.split('=')[1].replace(/"/g, ''));
}
