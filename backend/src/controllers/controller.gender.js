import { pool } from "../database/conexion.js";

export const listarGenero = async (req, res) => {
    try {
        let sql = 'SELECT * FROM genders'
        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'Not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error 
        })
    }
}