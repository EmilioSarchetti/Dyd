import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Personajes = () => {
  const [characters, setCharacters] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newCharacter, setNewCharacter] = useState({ name: '', class: '', level: '' });
  const [editingCharacterId, setEditingCharacterId] = useState(null);
  const [editingCharacter, setEditingCharacter] = useState({ name: '', class: '', level: '' });
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  // Cargar personajes al montar el componente
  useEffect(() => {
    fetchCharacters();
  }, []);

  // Función para obtener los personajes
  const fetchCharacters = () => {
    axios.get('http://localhost:3001/characters')
      .then(response => {
        setCharacters(response.data);
      })
      .catch(error => {
        console.error('Hubo un error obteniendo los personajes:', error);
      });
  };

  // Función para crear un nuevo personaje
  const handleCreateCharacter = () => {
    axios.post('http://localhost:3001/characters', newCharacter)
      .then(response => {
        setCharacters([...characters, response.data]);
        setNewCharacter({ name: '', class: '', level: '' });
        setIsCreating(false);
      })
      .catch(error => {
        console.error('Hubo un error creando el personaje:', error);
      });
  };

  // Función para eliminar un personaje
  const handleDeleteCharacter = (id) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este personaje?');
    if (confirmed) {
      axios.delete(`http://localhost:3001/characters/${id}`)
        .then(() => {
          setCharacters(characters.filter(character => character.id !== id));
        })
        .catch(error => {
          console.error('Hubo un error eliminando el personaje:', error);
        });
    }
  };

  // Función para iniciar la edición de un personaje
  const handleEditCharacter = (character) => {
    setEditingCharacterId(character.id);
    setEditingCharacter({ name: character.name, class: character.class, level: character.level });
  };

  // Función para guardar los cambios de un personaje editado
  const handleSaveCharacter = () => {
    axios.put(`http://localhost:3001/characters/${editingCharacterId}`, editingCharacter)
      .then(() => {
        setCharacters(characters.map(character =>
          character.id === editingCharacterId ? { ...editingCharacter, id: editingCharacterId } : character
        ));
        setEditingCharacterId(null);
        setEditingCharacter({ name: '', class: '', level: '' });
      })
      .catch(error => {
        console.error('Hubo un error actualizando el personaje:', error);
      });
  };

  // Función para manejar la navegación de regreso a la página de ítems
  const handleGoBackToItems = () => {
    navigate('/items');
  };

  return (
    <div>
      <h1>Lista de Personajes</h1>
      <h2>Dentro de esta ventana, podras crear personajes y luego listar los ya creados. Ten encuenta que solo es un demo de la pagina, y el tipado en clase se ve muy limitado.
        Algunos de los ejemplos que puedes colocar son "Mago de la escuela de la evocacion" o "Barbaro de la bestia".
        
      </h2>
      <h3> Dentro de unas proximas actualicaciones realizaremos una guia de preguntas para la creacion de tu personaje
        como tambien impartir imagenes que puedes darle a los mismos...</h3> 
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Esconder Personajes' : 'Listar Personajes'}
      </button>

      {isVisible && (
        <ul>
          {characters.length > 0 ? (
            characters.map(character => (
              <li key={character.id}>
                {editingCharacterId === character.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingCharacter.name}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, name: e.target.value })}
                      placeholder="Nombre"
                    />
                    <input
                      type="text"
                      value={editingCharacter.class}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, class: e.target.value })}
                      placeholder="Clase"
                    />
                    <input
                      type="number"
                      value={editingCharacter.level}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, level: e.target.value })}
                      placeholder="Nivel"
                    />
                    <button onClick={handleSaveCharacter}>Guardar</button>
                  </div>
                ) : (
                  <div>
                    <h2>{character.name}</h2>
                    <p>Clase: {character.class}</p>
                    <p>Nivel: {character.level}</p>
                    <button onClick={() => handleEditCharacter(character)}>Editar</button>
                    <button onClick={() => handleDeleteCharacter(character.id)}>Eliminar</button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>No hay personajes creados.</p>
          )}
        </ul>
      )}

      <button onClick={() => setIsCreating(!isCreating)}>
        {isCreating ? 'Cancelar' : 'Crear Nuevo Personaje'}
      </button>

      {isCreating && (
        <div>
          <input
            type="text"
            value={newCharacter.name}
            onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
            placeholder="Nombre"
          />
          <input
            type="text"
            value={newCharacter.class}
            onChange={(e) => setNewCharacter({ ...newCharacter, class: e.target.value })}
            placeholder="Clase"
          />
          <input
            type="number"
            value={newCharacter.level}
            onChange={(e) => setNewCharacter({ ...newCharacter, level: e.target.value })}
            placeholder="Nivel"
          />
          <button onClick={handleCreateCharacter}>Crear</button>
        </div>
      )}

      <button onClick={handleGoBackToItems}>Volver a Ítems</button>
    </div>
  );
};

export default Personajes;
