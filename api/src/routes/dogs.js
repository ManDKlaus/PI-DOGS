const { Router } = require('express');
const router = Router();
// Importar todos los controllers;
// Ejemplo: const authRouter = require('./auth.js');


const { getDogById, createDog, getDogs } = require('../services/dogs.js');
 
router.get('/', getDogs); 
router.get('/:id', getDogById);
router.post('/', createDog);

module.exports = router;