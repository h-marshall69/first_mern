import React, { useState } from "react";
import EmpleadoList from "./components/EmpleadoList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleEmpleadoAgregado = () => {
    setRefresh(!refresh); // Forzar el refresco de la lista de empleados
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-blue-600 w-full py-4 text-white shadow-lg">
        <h1 className="text-center text-3xl font-bold">Gestión de Empleados</h1>
      </header>

      <main className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <EmpleadoList onEmpleadoAgregado={handleEmpleadoAgregado} />
      </main>

      <footer className="mt-auto w-full bg-gray-800 text-gray-400 py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Gestión de Empleados. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;
