import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Conectado a MongoDB');
  } catch (err) {
    console.error('✘ Error de conexión a MongoDB:', err);
    process.exit(1);  // Termina el proceso si la conexión falla
  }
};

export default connectDB;
