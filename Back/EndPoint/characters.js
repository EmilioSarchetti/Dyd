const express = require('express');
const router = express.Router();
const db = require('../DB/db');

// Obtener todos los personajes
router.get('/', (req, res) => {
    const query = 'SELECT * FROM characters';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Obtener un personaje por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM characters WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Crear un nuevo personaje
router.post('/', (req, res) => {
    const { name, class: charClass, level } = req.body;
    const query = 'INSERT INTO characters (name, class, level) VALUES (?, ?, ?)';
    db.query(query, [name, charClass, level], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, name, charClass, level });
    });
});

// Actualizar un personaje por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, class: charClass, level } = req.body;
    const query = 'UPDATE characters SET name = ?, class = ?, level = ? WHERE id = ?';
    db.query(query, [name, charClass, level, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Personaje actualizado correctamente' });
    });
});

// Eliminar un personaje por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM characters WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Personaje eliminado correctamente' });
    });
});

// Exportamos el router
module.exports = router;
