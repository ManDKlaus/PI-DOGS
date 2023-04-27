const axios = require("axios");

require("dotenv").config() // Objeto process con la propiedad env
const { createDogCont, getDog, getDogsByName, getAllDogs } = require("../controllers/dogs")
const {
    API_URL,
    API_KEY,
    URL_IMAGE,
    STATUS_OK,
    STATUS_ERROR,
} = process.env;

async function createDog (req, res) {
    const {
        name,
        weight,
        height,
        lifeSpan,
        temperaments,
        image,} = req.body;
    try {
        const dog = await createDogCont(
            name,
            weight,
            height,
            lifeSpan,
            temperaments,
            image,
        );
        res.status(STATUS_OK).json(dog);
    } catch (error) {
        res.status(500).json({ message: error });
    };
}

async function getDogById (req, res) {
    const {id} = req.params;
    const aux = isNaN(id);
    try {
        const dog = await getDog(id, aux);
        res.status(STATUS_OK).json(dog);
    } catch (error) {
        res.status(500).json({ message: error });
    };
}

async function getDogs (req, res) {
    const {name} = req.query;
    try {
        if(name){
            const dogs = await getDogsByName(name);  
            res.status(STATUS_OK).json(dogs);  
        } else {
            const dogs1 = await getAllDogs();
            res.status(STATUS_OK).json(dogs1);
        };
    } catch (error) {
        res.status(500).json({ message: error });
    };
}

module.exports = {
    getDogById,
    createDog,
    getDogs,
};