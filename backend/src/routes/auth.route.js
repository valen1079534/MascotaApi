import { Router } from "express";
import { validar} from "../controllers/controller.auth.js";

const routeUser = Router()

routeUser.post('/validar', validar)

export default routeUser