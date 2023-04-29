const axios = require("axios");

require("dotenv").config() // Objeto process con la propiedad env
const { getTemperaments } = require("../controllers/temperaments")
const {
    STATUS_OK,
} = process.env;

async function getAllTemperaments (req, res) {
    try {
        const temps = await getTemperaments();
        res.status(STATUS_OK).json(temps);
    } catch (error) {
        res.status(500).json({ message: error });
    };
}

module.exports = {
    getAllTemperaments,
};