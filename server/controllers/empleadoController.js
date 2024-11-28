import Empleado from '../models/empleadoModel.js';

// Crear un nuevo empleado
export const crearEmpleado = async (req, res) => {
  try {
    const { id, nombre, departamento, sueldo } = req.body;

    const empleado = new Empleado({ id, nombre, departamento, sueldo });
    await empleado.save();

    res.status(201).json(empleado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el empleado' });
  }
};

// Obtener empleados con o sin paginación
export const obtenerEmpleados = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // Página actual, por defecto es la 1
    const limit = parseInt(req.query.limit) || 10;  // Cantidad de empleados por página, por defecto 10
    const skip = (page - 1) * limit;

    const empleados = await Empleado.find().skip(skip).limit(limit);
    const totalEmpleados = await Empleado.countDocuments();
    const totalPages = Math.ceil(totalEmpleados / limit);

    res.status(200).json({
      empleados,
      totalEmpleados,
      totalPages,
      currentPage: page,
      limit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
};

// Obtener un empleado por id
export const obtenerEmpleadoPorId = async (req, res) => {
  try {
    const empleado = await Empleado.findOne({ id: req.params.id });
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json(empleado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
};

// Actualizar empleado
export const actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;  // Obtener el ID desde los parámetros de la URL
    const { nombre, departamento, sueldo } = req.body;  // Obtener los datos a actualizar desde el cuerpo de la solicitud

    const empleado = await Empleado.findOneAndUpdate(
      { id },  // Buscar por el 'id' del empleado (no el _id de Mongo)
      { nombre, departamento, sueldo },
      { new: true }  // Devuelve el documento actualizado
    );

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.status(200).json(empleado);  // Devuelve el empleado actualizado
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
};

// Eliminar empleado
export const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;  // Obtener el ID desde los parámetros de la URL

    const empleado = await Empleado.findOneAndDelete({ id });

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.status(200).json({ message: 'Empleado eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};