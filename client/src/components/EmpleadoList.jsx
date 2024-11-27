// src/components/EmpleadoList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AgregarEmpleado from './AgregarEmpleado';

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [id, setId] = useState(''); // ID para la búsqueda
  const [empleadoEncontrado, setEmpleadoEncontrado] = useState(null); // Empleado encontrado

  const fetchEmpleados = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/empleados?page=${page}&limit=5`);
      setEmpleados(response.data.empleados);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener los empleados');
      setLoading(false);
    }
  };

  const fetchEmpleadoPorId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/empleados/${id}`);
      setEmpleadoEncontrado(response.data);
      setError('');
    } catch (err) {
      setError('Empleado no encontrado');
      setEmpleadoEncontrado(null);
    }
  };

  useEffect(() => {
    if (id) {
      // Si hay un ID en el estado, buscar el empleado por ID
      fetchEmpleadoPorId(id);
    } else {
      // Si no hay ID, obtener los empleados con paginación
      fetchEmpleados();
    }
  }, [id, page]); // Dependencias: cuando cambie `id` o `page`, volvemos a hacer la solicitud

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/empleados/${id}`);
      fetchEmpleados(); // Refrescar la lista después de eliminar
    } catch (err) {
      setError('Error al eliminar el empleado');
    }
  };

  const handleSearchById = (e) => {
    e.preventDefault();
    if (id) {
      fetchEmpleadoPorId(id);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      await axios.post('http://localhost:5000/api/empleados', newEmployee);
      fetchEmpleados(); // Refrescar la lista de empleados después de agregar uno nuevo
      setShowModal(false); // Cerrar el modal
    } catch (err) {
      setError('Error al agregar el empleado');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Lista de Empleados</h2>

      {/* Formulario de búsqueda por ID */}
      <form onSubmit={handleSearchById}>
        <label>Buscar por ID:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {/* Mostrar el empleado encontrado */}
      {empleadoEncontrado ? (
        <div>
          <h3>Empleado Encontrado:</h3>
          <p>ID: {empleadoEncontrado.id}</p>
          <p>Nombre: {empleadoEncontrado.nombre}</p>
          <p>Departamento: {empleadoEncontrado.departamento}</p>
          <p>Sueldo: {empleadoEncontrado.sueldo}</p>
        </div>
      ) : (
        <>
          {/* Tabla de empleados */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Departamento</th>
                <th>Sueldo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado) => (
                <tr key={empleado._id}>
                  <td>{empleado.id}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.departamento}</td>
                  <td>{empleado.sueldo}</td>
                  <td>
                    <button onClick={() => handleDelete(empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Anterior
            </button>
            <span> Página {page} de {totalPages} </span>
            <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
              Siguiente
            </button>
          </div>
        </>
      )}

      {/* Botón para abrir el modal */}
      <button onClick={() => setShowModal(true)}>Agregar Empleado</button>

      {/* Modal para agregar un nuevo empleado */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar Empleado</h3>
            <AgregarEmpleado onAdd={handleAddEmployee} closeModal={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpleadoList;
