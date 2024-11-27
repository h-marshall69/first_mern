import mongoose from 'mongoose';

// Esquema de empleado
const empleadoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true, maxlength: 10 },
  departamento: { type: String, required: true, maxlength: 20 },
  sueldo: { type: Number, required: true },
});

const Empleado = mongoose.model('Empleado', empleadoSchema);

export default Empleado;
