// src/App.jsx

import React, { useState } from 'react';
import EmpleadoList from './components/EmpleadoList';
import AgregarEmpleado from './components/AgregarEmpleado';
import BuscarEmpleado from './components/BuscarEmpleado';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleEmpleadoAgregado = () => {
    setRefresh(!refresh); // Forzar el refresco de la lista de empleados
  };

  return (
    <div className="App">
      <h1>Gestión de Empleados</h1>
      
    
      <EmpleadoList onEmpleadoAgregado={handleEmpleadoAgregado} />
    </div>
  );
}

export default App;
