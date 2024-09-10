import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Bienvenido a la Aplicación</h1>
      <h2>En esta aplicación sencilla solo se pueden crear personajes e items, modificarlos y eliminarlos de manera individual. 
        Cada boton te lleva a una pestaña diferente y desde esas pestañas puedes dirigirte a la otra de forma de ir y venir. 
        Solicito que cada usuario a quien envié este enlace, úse la pagina con respeto y no trolee a los demas usuario, de lo contrario seran perseguidos
        y baneados.

        DISFRUTEN :D
      </h2>
      <button onClick={() => handleNavigate('/items')}>Ir a Ítems</button>
      <button onClick={() => handleNavigate('/personajes')}>Ir a Personajes</button>
    </div>
  );
};

export default Inicio;
