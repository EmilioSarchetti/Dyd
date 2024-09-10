const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./DB/db.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Importar rutas
const characterRoutes = require('./EndPoint/characters.js');
const itemsRoutes = require('./EndPoint/items.js');
const characterItemsRoutes = require('./EndPoint/character_items.js');

// Usar rutas
app.use('/characters', characterRoutes);
app.use('/items', itemsRoutes);
app.use('/character_items', characterItemsRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
