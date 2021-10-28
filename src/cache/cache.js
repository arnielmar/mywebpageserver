import dotenv from 'dotenv';
import redis from 'redis';
import util from 'util';

dotenv.config();

const {
  REDIS_URL: redisUrl,
} = process.env;

let client;

let asyncGet;
let asyncSet;
let asyncTtl;

if (redisUrl) {
  client = redis.createClient({ url: redisUrl });
  asyncGet = util.promisify(client.get).bind(client);
  asyncSet = util.promisify(client.set).bind(client);
  asyncTtl = util.promisify(client.ttl).bind(client);
}

/**
 * Returns cached data or null if not cached.
 *
 * @param {string} cacheKey Cache key for to get data
 * @returns {object} Data as the cached object, otherwise null
 */
export async function get(cacheKey) {
  // Caching turned off
  if (!client || !asyncGet) {
    return null;
  }

  let cached;

  // Try to get cached data
  try {
    cached = await asyncGet(cacheKey);
  } catch (e) {
    console.warn(`Unable to get from cache, ${cacheKey} ${e.message}`);
    return null;
  }

  // If no cached data
  if (!cached) {
    return null;
  }

  let result;

  // Parse cached data
  try {
    result = JSON.parse(cached);
  } catch (e) {
    console.warn(`Unable to parse cached data, ${cacheKey} ${e.message}`);
    return null;
  }

  // Return parsed cached data
  return result;
}

/**
 * Cache data for a specific time under a cacheKey.
 *
 * @param {string} cacheKey Cache key to cache data under
 * @param {object} data Data to cache
 * @param {number} ttl Time-to-live of cache
 * @returns {Promise<boolean>} true if data was cached, false otherwise
 */
export async function set(cacheKey, data, ttl) {
  // Caching turned off
  if (!client || !asyncSet) {
    return false;
  }

  // Try to set cached data
  try {
    const serialized = JSON.stringify(data);
    await asyncSet(cacheKey, serialized, 'EX', ttl);
  } catch (e) {
    console.warn(`Unable to set cache for ${cacheKey}, ${e.message}`);
    return false;
  }

  // Chaching data successful
  return true;
}

/**
 * Return ttl for cacheKey if it exists, -1 otherwise.
 *
 * @param {string} cacheKey Cache key to get ttl for
 * @returns {number} ttl for cacheKey if it exists, -1 otherwise
 */
export async function keyTtl(cacheKey) {
  // Caching turned off
  if (!client || !asyncTtl) {
    return -1;
  }

  let ttl = -1;

  // Try to get ttl for cacheKey
  try {
    const result = await asyncTtl(cacheKey);
    ttl = parseInt(result, 10);
  } catch (e) {
    console.warn(`Unable to get ttl for ${cacheKey}, ${e.message}`);
    return ttl;
  }

  // Getting ttl successful
  return ttl;
}
