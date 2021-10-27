import { getData } from '../utils/getData.js';

export async function getIndex(req, res) {
  const data = await getData();
  return res.json(data);
}
