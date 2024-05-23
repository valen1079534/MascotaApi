

import React, { useContext, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from './../../public/bg.jpg';
import photoIcon from './../../public/photo-lg-0.jpg'
import iconClose from './../../public/btn-close.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import { PetsContext } from '../context/PetsContext';

const ConsultarMascota = () => {

    const { mascota, getMascotasId } = useContext(PetsContext);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getMascotasId(id);
            console.log(mascota);
        } else {
            console.error("ID is undefined");
        }
    }, [id]);

    if (!mascota) {
        return <div>Loading...</div>;
    }
    const navigate = useNavigate()

    const volver = () => {
        navigate('/Home')
    }   

    

    return (
        <div
            className='flex flex-col items-center min-h-screen'
            style={{ backgroundImage: `url(${img})  `, backgroundPosition: 'center', backgroundRepeat:'no-repeat' }}
        >
            <div className='flex mt-28 items-center justify-between'>
                <FaAngleLeft className='mr-20 flex text-white text-xl cursor-pointer' onClick={volver} />
                <label className='flex mr-20 text-white font-semibold'> Consultar mascota </label>
                <img className='flex justify-between rounded-full' src={iconClose} alt="" />
            </div>
            <div className='mt-16 mb-16'>
                <img className='rounded-full w-40' src={`http://localhost:5000/img/${mascota.photo}`} alt={mascota.photo} />
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-row mb-2'>
                    <div className='bg-[#8090AC] h-10 w-28 flex justify-center items-center rounded-l-xl'>
                        <label className='text-white text-lg font-semibold'>Nombre: </label>
                    </div>
                    <div className='bg-[#ABB5C7] h-10 w-56 flex justify-center items-center rounded-r-xl'>
                        <label className='text-[#2C4674] text-lg font-semibold'> {mascota.nombre_mascota} </label>
                    </div>
                </div>
                <div className='flex flex-row mb-2'>
                    <div className='bg-[#8090AC] h-10 w-28 flex justify-center items-center rounded-l-xl'>
                        <label className='text-white text-lg font-semibold'>Raza: </label>
                    </div>
                    <div className='bg-[#ABB5C7] h-10 w-56 flex justify-center items-center rounded-r-xl'>
                        <label className='text-[#2C4674] text-lg font-semibold'> {mascota.nombre_razas} </label>
                    </div>
                </div>
                <div className='flex flex-row mb-2'>
                    <div className='bg-[#8090AC] h-10 w-28 flex justify-center items-center rounded-l-xl'>
                        <label className='text-white text-lg font-semibold'>Categoria: </label>
                    </div>
                    <div className='bg-[#ABB5C7] h-10 w-56 flex justify-center items-center rounded-r-xl'>
                        <label className='text-[#2C4674] text-lg font-semibold'> {mascota.nombre_categorias} </label>
                    </div>
                </div>
                <div className='flex flex-row mb-2'>
                    <div className='bg-[#8090AC] h-10 w-28 flex justify-center items-center rounded-l-xl'>
                        <label className='text-white text-lg font-semibold'>Genero: </label>
                    </div>
                    <div className='bg-[#ABB5C7] h-10 w-56 flex justify-center items-center rounded-r-xl'>
                        <label className='text-[#2C4674] text-lg font-semibold'> {mascota.nombre_gender} </label>
                    </div>
                </div>

            </div>
            
        </div>  
    );
}

export default ConsultarMascota;