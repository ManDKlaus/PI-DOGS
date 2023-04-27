const axios = require("axios");

require("dotenv").config() // Objeto process con la propiedad env
const { getTemperaments } = require("../controllers/temperaments")
const {
    API_URL,
    API_KEY,
    URL_IMAGE,
    STATUS_OK,
    STATUS_ERROR,
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