import { getData } from '../utils/getData.js';

export async function getProjects(req, res) {
  const { projects } = await getData();
  return res.json(projects);
}
