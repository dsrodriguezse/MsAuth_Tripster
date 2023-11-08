import { Router } from 'express';
import { addUsuario, loginUser } from '../controllers/usuario.controller';

import { getUsuarios } from '../controllers/usuario.controller';
import validateToken from './validate-token';


const router = Router();

router.post('/', addUsuario);
router.post('/login', loginUser);
router.get('/usuarios', getUsuarios);

export default router;