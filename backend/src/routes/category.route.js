import { Router } from "express";
import { listarCategorias } from './../controllers/controller.category.js';

const routeCategory = Router()

routeCategory.get('/listar', listarCategorias)

export default routeCategory