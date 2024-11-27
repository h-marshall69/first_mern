// src/components/AgregarEmpleado.jsx
import React, { useState } from 'react';

const AgregarEmpleado = ({ onAdd, closeModal }) => {
  const [newId, setNewId] = useState('');
  const [newNombre, setNewNombre] = useState('');
  const [newDepartamento, setNewDepartamento] = useState('');
  const [newSueldo, setNewSueldo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newId || !newNombre || !newDepartamento || !newSueldo) {
      setError('Por favor complete todos los campos');
      return;
    }

    const newEmployee = { id: newId, nombre: newNombre, departamento: newDepartamento, sueldo: newSueldo };
    onAdd(newEmployee); // Pasar el nuevo empleado al componente padre
    setNewId('');
    setNewNombre('');
    setNewDepartamento('');
    setNewSueldo('');
    setError('');
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="number"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={newNombre}
            onChange={(e) => setNewNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Departamento:</label>
          <input
            type="text"
            value={newDepartamento}
            onChange={(e) => setNewDepartamento(e.target.value)}
          />
        </div>
        <div>
          <label>Sueldo:</label>
          <input
            type="number"
            value={newSueldo}
            onChange={(e) => setNewSueldo(e.target.value)}
          />
        </div>
        <button type="submit">Agregar</button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </form>
    </div>
  );
};

export default AgregarEmpleado;
