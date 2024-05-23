import { pool } from "../database/conexion.js";

export const registrarPets = async (req, res) => {
  try {
    const {race_id, category_id, photo, gender_id}=req.body

    let sql = `INSERT INTO pets(race_id, category_id, photo, gender_id) VALUES (?,?,?,?)`;
    const [rows] = await pool.query(sql,[race_id, category_id, photo, gender_id])

    if(rows.affectedRows>0){
        res.status(200).send({'message':'Registro exitioso'})
    }else{
        res.status(400).send({'message': 'No se registro usuario'})
    }
  } catch (error) {
    res.status(500).send({'message':'error servidor' + error})
  }
}

export const listarPets = async (req, res) => {
    try {
        let sql = `SELECT * FROM pets`
        const[resultado] = await pool.query(sql)

        if(resultado.length>0){
            res.status(200).json(resultado)
        }else{
            res.status(404).send({'message': 'No hay usuarios listados'})
        }
    } catch (error) {
            res.status(500).send({'message': 'error servido' + error})
    }
}