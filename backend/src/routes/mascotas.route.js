import { Router } from "express";
import { registrarMascota, listarMascotas, actualizarMascota, eliminarMascota, buscarMascota, cargarImage } from "../controllers/controller.mascotas.js";
import { validarToken } from "../controllers/controller.auth.js";


const routeMascotas = Router()

routeMascotas.get('/listar', validarToken,listarMascotas)
routeMascotas.post('/registrar', validarToken,cargarImage, registrarMascota)
routeMascotas.put('/actualizar/:id', cargarImage ,actualizarMascota)
routeMascotas.get('/buscar/:id', buscarMascota)
routeMascotas.delete('/eliminar/:id', validarToken,eliminarMascota)

export default routeMascotas