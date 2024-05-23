import { Router } from "express";
import { listarRazas } from "../controllers/controller.races.js";

const routeRace = Router()

routeRace.get('/listar', listarRazas)

export default routeRace