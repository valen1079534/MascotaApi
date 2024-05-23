import React, { useContext, useEffect, useState } from 'react';
import img from "./../../public/bg.jpg"
import close from "./../../public/btn-close.jpg"
import photoIcon from "./../../public/photo-lg-0.jpg"
import iconCamera from "./../../public/icon-camera.jpg"
import saveBtn from "./../../public/btn-save.jpg"
import modificar from "./../../public/btn-update.jpg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import { PetsContext } from '../context/PetsContext.jsx';

const FormMascotas = () => {

    const [generos, setGeneros] = useState([])
    const [razas, setRazas] = useState([])
    const [categorias, setCategorias] = useState([])
    const { idMascota, mode, getMascotasId, mascota} = useContext(PetsContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre_mascota: '',
        fk_category: '',
        photo: '',
        fk_gender: '', 
        fk_race: ''
    })

    const token = localStorage.getItem('token')
  /*   const [raza, setRaza] = useState('') */

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
        if(mode === "update" && idMascota){
            getMascotasId(idMascota)
        }
    }, [mode, idMascota])

    useEffect(() => {
        if(mascota && mode === "update" ){
            setFormData({
                nombre_mascota: mascota.nombre_mascota || '',
                fk_category: mascota.fk_category || '',
                photo: mascota.photo || '',
                fk_gender: mascota.fk_gender || '',
                fk_race: mascota.fk_race || ''
            })
            /* setRaza(mascota.raza)
            console.log('Datos mascota:' ,mascota); */
        }
    }, [mode, mascota])

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
            datosSubmit.append('nombre_mascota', formData.nombre_mascota)
            datosSubmit.append('fk_race', formData.fk_race)
            datosSubmit.append('fk_category', formData.fk_category)
            datosSubmit.append('photo', formData.photo)
            datosSubmit.append('fk_gender', formData.fk_gender)

            try {
                if(mode === "update"){
                    console.log('Id de la mascota que se quiere actualizar', idMascota)

                    axios.put(`http://localhost:5000/pets/actualizar/${idMascota}`, datosSubmit, {headers: {token: token}}).then((response) => {
                        console.log(response.data)
                        alert(response.data.message)
                        navigate('/Home')
                    })

                }else{
                    axios.post(`http://localhost:5000/pets/registrar`,datosSubmit, {headers: {token: token}}).then((response) => {
                        console.log(response.data)
                        alert(response.data.message)
                        navigate('/Home')
                    })
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
                    <FaAngleLeft className='mr-20 mt-20 flex text-white text-xl cursor-pointer' onClick={volverHome} />
                    <label className='flex mr-20 mt-20 text-white font-semibold'> {mode === "create" ? "Adicionar mascota" : "Actualizar mascota"} </label>
                    <img className='flex justify-between mt-20 rounded-full' src={close} alt="" />
                </div>
                <div className='mt-16'>
                <img 
                    className='rounded-full w-40' 
                    src={mode === 'create' ? photoIcon : `http://localhost:5000/img/${mascota.photo}`} 
                    alt="Foto de mascota" 
                />
                </div>
                 <form onSubmit={handleSubmit} className='w-full max-w-sm pt-20'>
                    <div className='mb-4'>
                        <input
                            type='text'
                            name='nombre_mascota'
                            placeholder='Nombre'
                            value={formData.nombre_mascota}
                            onChange={handleChange}
                            className='w-full px-3 py-2 rounded-3xl border  bg-transparent focus:outline-none ml-5 placeholder-black-950 bg-slate-100'
                            style={{ height: '40px', width: '90%' }}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <select 
                            className='w-[345px]  px-3 py-2 rounded-3xl border  bg-transparent focus:outline-none ml-5 placeholder-black-950 bg-slate-100'
                            value={formData.fk_race}
                           onChange={handleChange}
                            name="fk_race"
                            id="fk_race"
                        >
                            <option value="" hidden> Seleccione la raza... </option>
                            {razas.map((race) => (
                                <option key={race.id_races} value={race.id_races}> {race.nombre_razas} </option>
                            ))}
                        </select>
                    </div>

                    <div className='mb-4'>
                        <select 
                            className='w-[345px]  px-3 py-2 rounded-3xl border border-gray-400 bg-transparent focus:outline-none ml-5 placeholder-black-950 bg-slate-100'
                            name="fk_category"
                            value={formData.fk_category}
                            onChange={handleChange}
                            id=""
                        >
                            <option value="" hidden> Seleccione categoria... </option>
                            {categorias.map((category) => (
                                <option key={category.id_category} value={category.id_category}> {category.nombre_categorias} </option>
                            ))}
                        </select>
                    </div>
                    <div className='relative mb-4 flex justify-center'>
                    <input
                        placeholder="Imagen de usuario"
                        type="file"
                        name="photo"
                        className="hidden"
                        id="fileInput"
                        onChange={handleChange}
                    />
                    <label
                    htmlFor="fileInput"
                    className="cursor-pointer items-center w-[345px] flex bg-[#8d9db9] rounded-full border placeholder-black-950"
                    >
                        <div className="flex items-center w-[200px] h-10 transition duration-300">
                        <span className="text-black-950 w-full ml-4">
                            Seleccionar imagen
                        </span>
                        </div>
                        
                    </label>
                        {/* <img src={iconCamera} alt="camera" className="absolute top-0 right-8 mt-3 ml-3 rounded-full" style={{ width: '20px', height: '20px' }} /> */}
                    </div>
    
                    <div className='mb-4'>
                        <div className='relative'>
                            <select 
                                className='w-[345px] bg-slate-100 px-3 py-2 rounded-3xl border  bg-transparent focus:outline-none ml-5 placeholder-blue-950'
                                name="fk_gender"
                                value={formData.fk_gender}
                                onChange={handleChange}
                                id=""
                            >
                                <option value="" hidden> Seleccione genero... </option>
                                {generos.map((gender) => (
                                    <option key={gender.id_gender} value={gender.id_gender}> {gender.nombre_gender} </option>
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

export default FormMascotas