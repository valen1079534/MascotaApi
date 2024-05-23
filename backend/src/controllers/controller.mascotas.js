import { pool } from "../database/conexion.js";
import multer from "multer";

const storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null, "public/img")
        },
        filename: function(req,file, cb){
            cb(null, file.originalname)
        }
    }
)

const upload = multer({storage: storage})
export const cargarImage = upload.single('photo')

export const registrarMascota = async (req, res) => {
    try {

        const {fk_race, fk_category, fk_gender, nombre_mascota} = req.body
        let photo = req.file.originalname

        let sql = `INSERT INTO pets (fk_race, fk_category, fk_gender, nombre_mascota, photo) VALUES (?, ?, ?, ?, ?)`

        const [rows] = await pool.query(sql, [fk_race, fk_category, fk_gender, nombre_mascota, photo])

        if(rows.affectedRows>0){
            res.status(200).json({status: 200, message: 'Mascota Registrada Con Exito'
            })
        }else{
            res.status(403).json({status: 403,message: 'No se registró la mascota'
            })
        }

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const listarMascotas = async (req, res) => {
    try {
        let sql = `SELECT
        id_pets, 
        nombre_mascota, 
        nombre_razas AS races,
        nombre_categorias AS categories, 
        nombre_gender AS genders, 
        photo
        FROM pets
        JOIN races ON fk_race = id_races 
        JOIN categories ON fk_category = id_category 
        JOIN genders ON fk_gender = id_gender`

        const [result] = await pool.query(sql);
        if(result.length > 0){
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontraron mascotas'
            });
        }
    } catch (error) {  
        res.status(500).json({
            status: 500,
            message: 'Error del servidor: ' + error
        });
    }
};


export const actualizarMascota = async (req, res) => {
    try {

        const {id} = req.params

        const {fk_race, fk_gender, fk_category, nombre_mascota } = req.body
        let photo = req.file.originalname

        let sql = `UPDATE pets SET fk_race =IFNULL(?, fk_race), fk_gender = IFNULL(?,fk_gender), fk_category = IFNULL(?, fk_category), nombre_mascota = IFNULL(?, nombre_mascota), photo = IFNULL(?, photo) WHERE id_pets = ?`
        
        const [rows] = await pool.query(sql, [fk_race, fk_gender, fk_category, nombre_mascota, photo, id ])
        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se actualizo con exito la mascota'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No fue posible actualizar la mascota'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
   
}

export const buscarMascota = async (req, res) => {
    try {
        const {id} = req.params

        let sql = `SELECT 
        id_pets, 
        p.*,
        r.*,
        c.*,
        g.*,
        photo
        FROM pets p
        JOIN races r ON fk_race = id_races 
        JOIN categories c ON fk_category = id_category 
        JOIN genders g ON fk_gender = id_gender 
        WHERE id_pets = ?`

        const [rows] = await pool.query(sql, [id])
        if(rows.length > 0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No se encontraron mascotas'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const eliminarMascota = async (req, res) => {
    try {
        const {id} = req.params

        let sql = `DELETE FROM pets WHERE id_pets = ?`
        const [rows] = await pool.query(sql, id)
        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se eliminó con éxito la mascota'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No fue posible eliminar la mascota'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}