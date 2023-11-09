import { Router } from 'express';
import { getDefault } from '../controllers/default.controller';
import { getUsuarios,getUsuarioPorId } from '../controllers/usuario.controller';


const router = Router();

router.get('/', getDefault);
router.get('/usuario', () => { console.log("entrando") });
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioPorId);

export default router;