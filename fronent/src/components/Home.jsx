import React, { useContext, useEffect, useState } from 'react';
import img from "./../../public/bg.jpg";
import close from "./../../public/btn-close.jpg";
import buttonAdd from "./../../public/btn-add.jpg";
import deletes from "./../../public/btn-delete.jpg";
import edit from "./../../public/btn-edit.jpg";
import lupa from "./../../public/btn-show.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PetsContext } from '../context/PetsContext';

const Home = () => {
    const [pets, setPets] = useState([]);
    const { getMascotasId, setIdMascota, setMode } = useContext(PetsContext);
    const navigate = useNavigate();

    useEffect(() => {
        getMascotas();
    }, []);

    const token = localStorage.getItem('token')

    const getMascotas = async () => {
        try {
            axios.get('http://localhost:5000/pets/listar', {headers: {token: token}}).then((response) => {
                console.log(response.data);
                setPets(response.data);

            })
        } catch (error) {
            console.error('Error al obtener las mascotas:', error);
        }
    };

    const ir = () => {
        setMode('create');
        navigate('/AdiccionarMascota');
    };

    const ModificarMascota = (id) => {
        setMode('update');
        setIdMascota(id);
        navigate(`/actualizar/${id}`);
    };

    const ConsultarMascota = async (id) => {
        console.log("Consultando ID:", id)
            await getMascotasId(id);
            setIdMascota(id)
            navigate(`/consultar/${id}`);
        
    };

    const eliminar = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/pets/eliminar/${id}`, {headers: {token: token}});
            console.log(response.data);
            if (response.status === 200) {
                console.log('Mascota eliminada');
                getMascotas();
            } else if (response.status === 404) {
                console.log('Se produjo un error al eliminar mascota');
            }
        } catch (error) {
            console.error('Error al eliminar la mascota:', error);
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div
            className='flex flex-col items-center min-h-screen'
            style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        >
            <div className='flex flex-row mt-28 justify-center'>
                <label className='text-white font-semibold'>Administrar Mascotas</label>
                <div className='ml-10'>
                    <img className='rounded-full cursor-pointer' src={close} onClick={logout} alt="Cerrar" />
                </div>
            </div>

            <div className='mt-10'>
                <img className='rounded-full cursor-pointer' src={buttonAdd} onClick={ir} alt="Agregar" />
            </div>

            <div className='flex flex-col items-center w-[400px] max-w-4xl overflow-hidden mt-6' style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {pets.map((mascota) => (
                    <div
                        key={mascota.id_pets}
                        className='flex items-center bg-slate-300 mt-4 w-[360px] rounded-2xl h-24'
                    >
                        <div>
                            <img className='rounded-full ml-3' alt={mascota.photo} src={`http://localhost:5000/img/${mascota.photo}`} />
                        </div>

                        <div className='flex flex-col ml-4'>
                            <label>{mascota.nombre_mascota}</label>
                            <label>{mascota.races}</label>
                        </div>

                        <div className='flex flex-row ml-20'>
                            <img className='rounded-full mr-2 cursor-pointer' src={lupa} onClick={() => ConsultarMascota(mascota.id_pets)} alt="ConsultarMascota" />

                            <img className='rounded-full mr-2 cursor-pointer' src={edit} onClick={() => ModificarMascota(mascota.id_pets)} alt="ModificarMascota" />

                            <img className='rounded-full mr-2 cursor-pointer' src={deletes} alt="Eliminar" onClick={() => eliminar(mascota.id_pets)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

