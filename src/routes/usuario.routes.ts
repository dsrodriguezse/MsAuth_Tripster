import { Router } from 'express';
import { addUsuario, loginUser } from '../controllers/usuario.controller';

//import { getUsuarios } from '../controllers/usuario.controller';
import { getUsuarios, getUsuarioPorId, getUsuarioToken } from '../controllers/usuario.controller';

import validateToken from './validate-token';
import { getDefault } from '../controllers/default.controller';

const router = Router();

router.get('/', getUsuarios);
router.post('/login', loginUser);
router.get('/:id',getUsuarioPorId);
router.post('/info', validateToken,()=>{console.log("RUTA/INFO")});

export default router;