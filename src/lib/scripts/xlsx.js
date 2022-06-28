import * as fs from 'fs';
import { read, readFile, set_fs, utils } from 'xlsx/xlsx.mjs';

set_fs(fs);

export { read, readFile, utils };
