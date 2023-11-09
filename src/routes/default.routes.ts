import { Router } from 'express';
import { getDefault } from '../controllers/default.controller';
import { getUsuarios,getUsuarioPorId } from '../controllers/usuario.controller';


const router = Router();

router.get('/', getDefault);

export default router;