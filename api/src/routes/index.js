const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require("./dogs");
const temperaments = require("./temperaments");
const favorites = require("./favorites");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs);
router.use('/temperaments', temperaments);
router.use('/favorites', favorites);

module.exports = router;
