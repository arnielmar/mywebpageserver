import express from 'express';

import { catchErrors } from '../utils/catchErrors.js';
import { getData } from '../utils/getData.js';

export const router = express.Router();

export async function getIndex(req, res) {
  const data = await getData();
  return res.json(data);
}

export async function getCV(req, res) {
  const { cv, projects } = await getData();
  const data = {
    cv,
    projects,
  };
  return res.json(data);
}

export async function getAbout(req, res) {
  const {
    cv: {
      info,
    },
  } = await getData();
  return res.json(info);
}

export async function getProjects(req, res) {
  const { projects } = await getData();
  return res.json(projects);
}

router.get('/', catchErrors(getIndex));
router.get('/cv', catchErrors(getCV));
router.get('/about', catchErrors(getAbout));
router.get('/projects', catchErrors(getProjects));
