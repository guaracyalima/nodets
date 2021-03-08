import { Router } from 'express';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';

import swaggerUi  from 'swagger-ui-express';
import swaggerDocument from '../swagger';

const routes = Router();

routes.get('/usuarios', UserController.index)
routes.delete('/usuarios/exclusao/:id', UserController.exclusao)
routes.get('/usuarios/detalhar/:id', UserController.visualizar)
routes.put('/usuarios/atualizar/:id', UserController.atualizar)
routes.post('/usuarios/registro', UserController.registro)


routes.post('/login', AuthController.login)


routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default routes;