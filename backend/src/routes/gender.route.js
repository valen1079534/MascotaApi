import { Router } from "express";
import { listarGenero } from './../controllers/controller.gender.js';

const routeGender = Router()

routeGender.get('/listar', listarGenero)

export default routeGender