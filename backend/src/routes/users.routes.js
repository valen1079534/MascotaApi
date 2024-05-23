import { Router } from "express";
import {  listarUsers } from "../controllers/controller.users.js";

const routeUsuario = Router()

routeUsuario.get('/users', listarUsers)

export default routeUsuario