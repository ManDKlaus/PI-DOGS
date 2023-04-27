const axios = require("axios");

require("dotenv").config() // Objeto process con la propiedad env

const { Temperament } = require("../db.js")

const {
    API_URL,
    API_KEY,
} = process.env;

async function getTemperaments(){
    const {data} = await axios.get(`${API_URL}`);
    const filteredTemperaments = new Set(
        data.flatMap((dog) => (dog.temperament ? dog.temperament.split(", ") : []))
    );
    const temperaments = [...filteredTemperaments];
    await Promise.all(temperaments.map((name) => Temperament.create({ name })));
    const tempsDB = await Temperament.findAll();
    return tempsDB;
};

module.exports = {
    getTemperaments,
};