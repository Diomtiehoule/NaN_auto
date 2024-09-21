import { Router } from 'express';
import AutoEcoleController from '../controllers/autoEcoleController.js';
import { auth } from '../middleware/auth.js';

const routerAutoEcole = Router()

routerAutoEcole.post('/create', AutoEcoleController.create);
routerAutoEcole.post('/login' , AutoEcoleController.login);
routerAutoEcole.get('/all' , AutoEcoleController.getAll);
routerAutoEcole.get('/:id' , auth , AutoEcoleController.getOne);
routerAutoEcole.put('/edit/:id' , auth , AutoEcoleController.edit);
routerAutoEcole.put('/delete/:id' , auth , AutoEcoleController.delete);

export default routerAutoEcole