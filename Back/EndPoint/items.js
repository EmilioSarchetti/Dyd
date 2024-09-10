const express = require('express');
const router = express.Router();
const db = require('../DB/db');

// Obtener todos los ítems
router.get('/', (req, res) => {
    const query = 'SELECT * FROM items';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Obtener un ítem por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM items WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Crear un nuevo ítem
router.post('/', (req, res) => {
    const { name, description, rarity } = req.body;
    const query = 'INSERT INTO items (name, description, rarity) VALUES (?, ?, ?)';
    db.query(query, [name, description, rarity], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, name, description, rarity });
    });
});

// Actualizar un ítem por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, rarity } = req.body;
    const query = 'UPDATE items SET name = ?, description = ?, rarity = ? WHERE id = ?';
    db.query(query, [name, description, rarity, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Ítem actualizado correctamente' });
    });
});

// Eliminar un ítem por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM items WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Ítem eliminado correctamente' });
    });
});

module.exports = router;