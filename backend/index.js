import express from 'express'
import body_parser  from 'body-parser'

import routeMascotas from './src/routes/mascotas.route.js'
import routeUser from './src/routes/auth.route.js'
import routeUsuario from './src/routes/users.routes.js'
import routeGender from './src/routes/gender.route.js';
import routeCategory from './src/routes/category.route.js';
import routeRace from './src/routes/races.route.js';

import cors from 'cors'

const servidor = express()

servidor.use(cors())

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))

servidor.use('/pets', routeMascotas)
servidor.use('/auth', routeUser)
servidor.use('/users', routeUsuario)
servidor.use('/gender', routeGender)
servidor.use('/category', routeCategory)
servidor.use('/races', routeRace)

servidor.set("view engine", "ejs")
servidor.set("views", "./view")

servidor.use(express.static('./public'))

servidor.get("/document", (req, res) => {
    res.render("documents.ejs")
})

servidor.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
})