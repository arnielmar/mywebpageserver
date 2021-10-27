import express from 'express';

import { catchErrors } from '../utils/catchErrors.js';
import { getCV } from './cv.js';
import { getAbout } from './about.js';
import { getProjects } from './projects.js';
import { getIndex } from './index.js';

export const router = express.Router();

router.get('/', catchErrors(getIndex));
router.get('/cv', catchErrors(getCV));
router.get('/about', catchErrors(getAbout));
router.get('/projects', catchErrors(getProjects));
