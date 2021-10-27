import { getData } from '../utils/getData.js';

export async function getAbout(req, res) {
  const {
    cv: {
      info,
    },
  } = await getData();
  return res.json(info);
}
