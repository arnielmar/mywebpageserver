import express from 'express';

import { catchErrors } from './utils/catchErrors.js';
import { getData } from './utils/getData.js';

export const router = express.Router();

async function getIndex(req, res) {
  const data = await getData();
  return res.json(data);
}

async function getCV(req, res) {
  const { cv, projects } = await getData();
  const data = {
    cv,
    projects,
  };
  return res.json(data);
}

async function getAbout(req, res) {
  const {
    cv: {
      info,
    },
  } = await getData();
  return res.json(info);
}

async function getProjects(req, res) {
  const { projects } = await getData();
  return res.json(projects);
}

async function getProject(req, res, next) {
  const { id } = req.params;

  const { projects } = await getData();
  const foundProject = projects.data[id];

  if (!foundProject) {
    // Goes to 404 middleware
    return next();
  }

  return res.json(foundProject);
}

async function getCourses(req, res) {
  const { cv } = await getData();
  const {
    education: {
      data,
    }
  } = cv;
  const courses = data[0].courses;
  return res.json(courses);
}

async function getCourse(req, res, next) {
  const { id } = req.params;

  const {
    cv: {
      education: {
        data: {
          courses
        }
      }
    }
  } = await getData();
  const foundProject = projects.data[id];

  if (!foundProject) {
    // Goes to 404 middleware
    return next();
  }

  return res.json(foundProject);
}

router.get('/', catchErrors(getIndex));
router.get('/cv', catchErrors(getCV));
router.get('/about', catchErrors(getAbout));
router.get('/projects', catchErrors(getProjects));
router.get('/projects/:id', catchErrors(getProject));
router.get('/courses', catchErrors(getCourses));
