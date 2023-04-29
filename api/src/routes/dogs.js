const { Router } = require('express');
const router = Router();
// Importar todos los controllers;
// Ejemplo: const authRouter = require('./auth.js');


const { getDogById, postDog, getDogs, deleteDog } = require('../services/dogs.js');
 
router.get('/', getDogs); 
router.get('/:id', getDogById);
router.post('/', postDog);
router.delete('/', deleteDog);

module.exports = router;