const express = require('express');
const router = express.Router();
const db = require('../DB/db');

// Asignar un ítem a un personaje
router.post('/:character_id/:item_id', (req, res) => {
    const { character_id, item_id } = req.params;
    const query = 'INSERT INTO character_items (character_id, item_id) VALUES (?, ?)';
    db.query(query, [character_id, item_id], (err) => {
        if (err) throw err;
        res.json({ message: 'Ítem asignado al personaje correctamente' });
    });
});

// Eliminar un ítem de un personaje
router.delete('/:character_id/:item_id', (req, res) => {
    const { character_id, item_id } = req.params;
    const query = 'DELETE FROM character_items WHERE character_id = ? AND item_id = ?';
    db.query(query, [character_id, item_id], (err) => {
        if (err) throw err;
        res.json({ message: 'Ítem eliminado del personaje correctamente' });
    });
});

module.exports = router;