import dotenv from 'dotenv';
import { get, set } from '../cache/cache.js';
import { readFile } from './readFile.js';

dotenv.config();

const {
  CACHE_FILE_TTL = 0,
} = process.env;

const cacheFileTtl = parseInt(CACHE_FILE_TTL, 10);

/**
 * Returns cached data if cached, otherwise fetches data, caches it and returns it.
 *
 * @returns {object} data
 */
async function cachedFile() {
  const cacheKey = 'file';

  const cached = await get(cacheKey);

  // File was in cache
  if (cached) {
    return cached;
  }

  // File was not in cache so we read from disc
  const data = await readFile();

  // And we set file to cache
  await set(cacheKey, data, cacheFileTtl);

  return data;
}

/**
 * Returns data.json file.
 *
 * @returns data.json
 */
export async function getData() {
  const json = await cachedFile();

  return json;
}
