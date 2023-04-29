const { Router } = require('express');
const router = Router();
// Importar todos los controllers;
// Ejemplo: const authRouter = require('./auth.js');


const { getFavorites, postFavorites, deleteFavorite } = require('../services/favorites.js');
 
router.get('/', getFavorites); 
router.post('/', postFavorites);
router.delete('/', deleteFavorite);

module.exports = router;