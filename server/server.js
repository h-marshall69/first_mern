import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import empleadoRoutes from './routes/empleadoRoutes.js';
import morgan from 'morgan';

dotenv.config();  // Cargar las variables de entorno

const app = express();

app.use(morgan('combined'));  // Esto te dará logs detallados de las solicitudes HTTP

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());  // Permitir solicitudes CORS
app.use(express.json());  // Parsear JSON en las solicitudes

// Rutas
app.use('/api/empleados', empleadoRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server is running at http://localhost:${PORT}`);
});
