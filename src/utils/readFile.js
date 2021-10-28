import { promises as fs } from 'fs';

/**
 * Les inn gögn úr JSON skrá.
 *
 * @returns {promise} Promise sem inniheldur gögn úr JSON skrá
 */
export async function readFile() {
  try {
    const file = await fs.readFile('data.json');
    return JSON.parse(file);
  } catch (e) {
    throw new Error('Gat ekki lesið JSON skrá af disk.');
  }
}
