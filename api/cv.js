import { getData } from '../utils/getData.js';

export async function getCV(req, res) {
  const { cv, projects } = await getData();
  const data = {
    cv,
    projects,
  };
  return res.json(data);
}
