import React, { useState } from 'react';
import axios from 'axios';

const CrearItem = ({ onItemCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rarity, setRarity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/items', { name, description, rarity })
      .then(response => {
        onItemCreated(response.data); // Añade el nuevo ítem a la lista
        setName('');
        setDescription('');
        setRarity('');
      })
      .catch(error => {
        console.error('Error al crear el ítem:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Rareza:</label>
        <input
          type="text"
          value={rarity}
          onChange={(e) => setRarity(e.target.value)}
        />
      </div>
      <button type="submit">Crear Ítem</button>
    </form>
  );
};

export default CrearItem;
