import { Router } from 'express';
import  AnuncioControllers  from './controllers/AnuncioControllers';

const routes = Router();

routes.get('/find/:produto', AnuncioControllers.find);

export default routes;
