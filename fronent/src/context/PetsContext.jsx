// PetsContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const PetsContext = createContext();

export const MascotasProvider = ({ children }) => {
  const [mascotas, setMascotas] = useState([]);
  const [mascota, setMascota] = useState([]);
  const [idMascota, setIdMascota] = useState(0);
  const [mode, setMode] = useState('create');

  const token = localStorage.getItem('token')

  const getMascotas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pets/listar' , {headers: {token: token}});
      setMascotas(response.data);
    } catch (error) {
      console.log('Error del servidor ' + error);
    }
  };

  const getMascotasId = async (id) => {
    if (!id) {
      console.error('No ID getMascotasId');
      return;
    }
    try {
      axios.get(`http://localhost:5000/pets/buscar/${id}` , {headers: {token: token}}).then((response) => {
        console.log(response.data[0]);
        setMascota(response.data[0])
      })
    } catch (error) {
      console.log('Error del servidor ' + error);
    }
  };

  const createMascotas = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/pets/registrar', {headers: {token: token}} ,data);
      if (response.status === 200) {
        console.log('Datos registrados exitosamente');
        getMascotas();
      }
    } catch (error) {
      console.log('Error del servidor ' + error);
    }
  };

  const updateMascotas = async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:5000/pets/actualizar/${id}` , {headers: {token: token}}, data);
      alert(response.data.message);
    } catch (error) {
      console.log('Error del servidor ' + error);
    }
  };

  const deleteMascotas = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/pets/eliminar/${id}` , {headers: {token: token}});
      alert(response.data.message);
    } catch (error) {
      console.log('Error del servidor ' + error);
    }
  };

  return (
    <PetsContext.Provider
      value={{
        idMascota,
        mascotas,
        mascota,
        mode,
        setMode,
        setMascotas,
        setMascota,
        setIdMascota,
        createMascotas,
        updateMascotas,
        getMascotas,
        getMascotasId,
        deleteMascotas,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
};
