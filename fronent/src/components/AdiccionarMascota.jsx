
import React, { useContext, useEffect, useRef, useState } from 'react';
import img from "./../../public/bg.jpg"
import close from "./../../public/btn-close.jpg"
import photoIcon from "./../../public/icon-camera.jpg"
import iconCamera from "./../../public/icon-camera.jpg"
import saveBtn from "./../../public/btn-save.jpg"
import modificar from "./../../public/btn-update.jpg"
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";

import { PetsContext } from '../context/PetsContext.jsx'

const AdiccionarMas = () => {

    const [generos, setGeneros] = useState([])
    const [razas, setRazas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [users, setUsers] = useState([])
    const {createMascotas, updateMascotas, idMascota, mode, getMascotasId, mascota} = useContext(PetsContext)
    const {id} = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: '',
        categoria: '',
        image: '',
        raza: "",
        genero: ''
    })

    useEffect(() => {
        axios.get('http://localhost:5000/gender/listar').then((response) => {
            setGeneros(response.data)
        })

        axios.get('http://localhost:5000/races/listar ').then((response) => {
            setRazas(response.data)
        })

        axios.get('http://localhost:5000/category/listar').then((response) => {
            setCategorias(response.data)
        })

    }, [])

    useEffect(() => {
        if(mode === 'update' && mascota){
            setFormData({
                nombre: mascota.nombre_mascota,
                categoria: mascota.fk_category,
                image: mascota.photo,
                genero: mascota.fk_gender,
                raza: mascota.fk_race
            })
            console.log('Datos mascota:' ,mascota);
        }
    }, [mode, mascota])

    useEffect(() => {
        getMascotasId(id)
    }, [])

    const handleChange = (e) => {
        const {name, value, type, files } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }))
    }

    const volverHome = () => {
        navigate('/Home')
    }

    const handleSubmit = async (e) => {
       
        e.preventDefault()
            const datosSubmit = new FormData()
            datosSubmit.append('nombre', formData.nombre_mascota)
            datosSubmit.append('raza', formData.fk_race)
            datosSubmit.append('categoria', formData.fk_category)
            datosSubmit.append('image', formData.photo)
            datosSubmit.append('genero', formData.fk_gender)

            try {
                if(mode === 'update'){
                    console.log('Id de la mascota que se quiere actualizar', idMascota);
                    await updateMascotas(idMascota, datosSubmit)
                }else{
                    await createMascotas(datosSubmit)
                }
            } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

        return (
            <div
                className='flex flex-col items-center min-h-screen'
                style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundRepeat:'no-repeat' }}
            >
                <div className='flex mt-28 items-center justify-between'>

                    <FaAngleLeft className='mr-20 flex text-white text-xl cursor-pointer' onClick={volverHome} />

                    <label className='flex mr-20 text-white font-semibold'> {mode === "create" ? "Adicionar mascota" : "Actualizar mascota"} </label>

                    <img className='flex justify-between rounded-full' src={close} alt="" />
                </div>
                
                <div className='mt-16'>
                <img 
                    className='rounded-full' 
                    src={mode === 'create' ? photoIcon : `http://localhost:5000/img/${photo}`}
                    alt="Foto de mascota" 
                />
                </div>
                 <form onSubmit={handleSubmit} className='w-full max-w-sm pt-24'>
                    <div className='mb-4'>
                        <input
                            type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Nombre'
                            value={formData.nombre_mascota}
                            onChange={handleChange}
                            className='w-full bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                            style={{ height: '40px', width: '90%' }}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <select 
                           
                            className='w-[345px] bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                            value={formData.fk_race}
                            onChange={handleChange}
                            name="raza"
                            id="raza"
                        >
                            <option value="" hidden> Seleccione la raza... </option>
                            {razas.map(race => (
                                <option value={race.id_races}> {race.nombre_razas} </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4'>
                        <select 
                            className='w-[345px] bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                            name="categoria"
                            value={formData.fk_category}
                            onChange={handleChange}
                            id=""
                        >
                            <option value="" hidden> Seleccione categoria... </option>
                            {categorias.map(category => (
                                <option value={category.id_category}> {category.nombre_categoria} </option>
                            ))}
                        </select>
                    </div>
                    <div className='relative mb-4 flex justify-center'>
                    <input
                        placeholder="Imagen de usuario"
                        type="file"
                        name="image"
                        className="hidden"
                        id="fileInput"
                        onChange={handleChange}
                    />
                    <label
                    htmlFor="fileInput"
                    className="cursor-pointer items-center w-[345px] flex bg-[#8d9db9] rounded-full border"
                    >
           
                        <div className="flex items-center w-[200px] h-10 transition duration-300">
                        <span className="text-blue-950 w-full ml-4">
                            Seleccionar imagen
                        </span>
                        </div>
                        
                    </label>
                        <img src={iconCamera} alt="camera" className="absolute top-0 right-8 mt-3 ml-3 rounded-full" style={{ width: '20px', height: '20px' }} />
                    </div>
    
                    <div className='mb-4'>
                        <div className='relative'>
                            <select 
                                className='w-[345px] bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                                name="genero"
                                value={formData.genero}
                                onChange={handleChange}
                                id=""
                            >
                                <option value="" hidden> Seleccione genero... </option>
                                {generos.map(gender => (
                                    <option value={gender.id_gender}> {gender.nombre_genero} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button>
                        {mode === 'create' ? (
                            <img className='rounded-full ml-5 cursor-pointer' style={{ width: '90%' }} src={saveBtn} alt="" onSubmit={handleSubmit} />

                        ): <img className='rounded-full ml-5 cursor-pointer' style={{ width: '90%' }} src={modificar} alt="" onSubmit={handleSubmit} />}
                    </button>
                    
                    
                </form>
            </div>
        );
}

/* export default AdiccionarMas
 */