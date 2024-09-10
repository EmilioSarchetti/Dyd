import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './compont/header'; // Asegúrate de que la ruta sea correcta
import ItemList from './compont/items/itemlist'; // Asegúrate de importar correctamente
import Personajes from './compont/personajes/personajes'; // Página de personajes
import Inicio from './compont/inicio';
import './compont/styles.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/items" element={<ItemList />} />
          <Route path="/personajes" element={<Personajes />} />
          <Route path="/" element={<Inicio />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
