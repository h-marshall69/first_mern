// src/components/BuscarEmpleado.jsx

import React, { useState } from 'react';
import axios from 'axios';

const BuscarEmpleado = () => {
  const [id, setId] = useState('');
  const [empleado, setEmpleado] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      setError('Por favor ingresa un ID');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/empleados/${id}`);
      setEmpleado(response.data);
      setError('');
    } catch (err) {
      setError('Empleado no encontrado');
      setEmpleado(null);
    }
  };

  return (
    <div>
      <h2>Buscar Empleado por ID</h2>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <label>ID del Empleado:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Buscar</button>
      </form>

      {empleado && (
        <div>
          <h3>Empleado Encontrado:</h3>
          <p>ID: {empleado.id}</p>
          <p>Nombre: {empleado.nombre}</p>
          <p>Departamento: {empleado.departamento}</p>
          <p>Sueldo: {empleado.sueldo}</p>
        </div>
      )}
    </div>
  );
};

export default BuscarEmpleado;
