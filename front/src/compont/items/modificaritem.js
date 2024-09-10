import React, { useState } from 'react';
import axios from 'axios';

const ModificarItem = ({ item, onUpdate }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [rarity, setRarity] = useState(item.rarity);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/items/${item.id}`, {
      name,
      description,
      rarity
    })
      .then(response => {
        onUpdate(response.data); // Actualiza la lista de ítems con el ítem modificado
      })
      .catch(error => {
        console.error('Error actualizando el ítem:', error);
      });
  };

  return (
    <form onSubmit={handleUpdate}>
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
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default ModificarItem;
