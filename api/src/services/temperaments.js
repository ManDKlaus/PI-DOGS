const axios = require("axios");

const { searchTemperaments } = require("../controllers/temperaments")

async function getAllTemperaments (req, res) {
    try {
        const temps = await searchTemperaments();
        res.status(200).json(temps);
    } catch (error) {
        res.status(500).json({ message: "Temperaments not found" });
    };
}

module.exports = {
    getAllTemperaments,
};