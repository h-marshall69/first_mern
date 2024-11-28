import React, { useState } from "react";
import axios from "axios";

const AgregarEmpleado = ({ onAdd, closeModal }) => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    departamento: "",
    sueldo: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/empleados", formData);
      onAdd(); // Notificar al padre que se agregó un empleado
      closeModal(); // Cerrar el modal
    } catch (err) {
      setError("Error al agregar empleado");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border rounded shadow">
      <h3 className="text-xl font-bold mb-4">Agregar Empleado</h3>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label>ID</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label>Departamento</label>
        <input
          type="text"
          name="departamento"
          value={formData.departamento}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label>Sueldo</label>
        <input
          type="number"
          name="sueldo"
          value={formData.sueldo}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={closeModal}
          className="bg-gray-200 px-4 py-2 mr-2 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default AgregarEmpleado;
