import React, { useState } from 'react';
import axios from 'axios';
import CrearItem from './crearitem'; // Importa el componente CrearItem
import ModificarItem from './modificaritem'; // Importa el componente ModificarItem
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  const navigate = useNavigate();

  const fetchItems = () => {
    if (!items.length) {
      axios.get('http://localhost:3001/items')
        .then(response => {
          setItems(response.data);
          setIsVisible(true);
        })
        .catch(error => {
          console.error('Hubo un error obteniendo los ítems:', error);
        });
    } else {
      setIsVisible(!isVisible);
    }
  };

  const handleItemDeleted = (id) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este ítem?');
    if (confirmed) {
      axios.delete(`http://localhost:3001/items/${id}`)
        .then(() => {
          setItems(items.filter(item => item.id !== id));
        })
        .catch(error => {
          console.error('Error al eliminar el ítem:', error);
        });
    }
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id); // Guardar el id del ítem que estamos editando
  };

  return (
    <div>
      <h1>Lista de Ítems</h1>
      <h2>Dentro de esta ventana, podras crear items y luego listar los ya creados. Ten encuenta que solo es un demo de la pagina, y las caracteristicas se ven muy limitadas.
        
      </h2>
      <h3> Dentro de unas proximas actualicaciones realizaremos una descripcion mas apropiada para este segmento,
        como tambien impartir imagenes que pueden darte una vision mejorada...</h3> 
      <button onClick={fetchItems}>
        {isVisible ? 'Ocultar Ítems' : 'Mostrar Ítems'}
      </button>

      {isVisible && (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Rareza: {item.rarity}</p>
              <button onClick={() => handleItemDeleted(item.id)}>Eliminar</button>
              <button onClick={() => handleEditItem(item)}>Modificar</button>
              {}
              {editingItemId === item.id && (
                <ModificarItem
                  item={item}
                  onUpdate={(updatedItem) => {
                    setItems(items.map(i => (i.id === updatedItem.id ? updatedItem : i)));
                    setEditingItemId(null);
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      <CrearItem onItemCreated={(newItem) => setItems([...items, newItem])} />
      <button onClick={() => navigate('/personajes')}>Personajes</button>
    </div>
  );
};

export default ItemList;
