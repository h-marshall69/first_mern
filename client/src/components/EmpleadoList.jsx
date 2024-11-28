import React, { useEffect, useState } from "react";
import axios from "axios";
import AgregarEmpleado from "./AgregarEmpleado";
import EditarEmpleadoModal from "./EditarEmpleadoModal";

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);

  const fetchEmpleados = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/empleados?page=${page}&limit=5`
      );
      setEmpleados(response.data.empleados);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      setError("Error al obtener los empleados");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/empleados/${id}`);
      fetchEmpleados(); // Refrescar lista después de eliminar
    } catch (err) {
      setError("Error al eliminar el empleado");
    }
  };

  const handleEdit = (empleado) => {
    setSelectedEmpleado(empleado);
    setShowEditModal(true);
  };

  const handleEmployeeUpdate = async (empleadoActualizado) => {
    try {
      await axios.put(
        `http://localhost:5000/api/empleados/${empleadoActualizado.id}`,
        empleadoActualizado
      );
      fetchEmpleados(); // Refrescar lista de empleados después de la actualización
      setShowEditModal(false); // Cerrar el modal
    } catch (err) {
      setError("Error al actualizar el empleado");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold">Lista de Empleados</h2>

      {/* Tabla de empleados */}
      <table className="table-auto w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Departamento</th>
            <th className="border px-4 py-2">Sueldo</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado._id}>
              <td className="border px-4 py-2">{empleado.id}</td>
              <td className="border px-4 py-2">{empleado.nombre}</td>
              <td className="border px-4 py-2">{empleado.departamento}</td>
              <td className="border px-4 py-2">${empleado.sueldo}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(empleado)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(empleado.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Siguiente
        </button>
      </div>

      {/* Botón para agregar empleado */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Agregar Empleado
      </button>

      {/* Modal para agregar empleado */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <AgregarEmpleado
            onAdd={fetchEmpleados} // Actualizar la lista de empleados
            closeModal={() => setShowModal(false)}
          />
        </div>
      )}

      {/* Modal para editar empleado */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <EditarEmpleadoModal
            empleado={selectedEmpleado}
            onEdit={handleEmployeeUpdate} // Llamar a handleEmployeeUpdate para actualizar
            closeModal={() => setShowEditModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EmpleadoList;
