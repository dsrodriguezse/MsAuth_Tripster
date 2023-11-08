import { Router } from 'express';
const router: Router = Router();

import { singin,singup,profile} from '../controllers/auth.controller'

router.post('/singup', singup);
router.post('/singin', singin);
router.get('/profile', profile);

export default router;