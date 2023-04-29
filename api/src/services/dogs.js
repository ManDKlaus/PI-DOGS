const axios = require("axios");

require("dotenv").config() // Objeto process con la propiedad env
const { createDog, getDog, getDogsByName, getAllDogs } = require("../controllers/dogs")
const {
    STATUS_OK,
    STATUS_ERROR,
} = process.env;

async function postDog (req, res) {
    const {
        name,
        weight,
        height,
        lifeSpan,
        temperamentsId,
        image
    } = req.body;
    try {
        const dog = await createDog(
            name,
            weight,
            height,
            lifeSpan,
            temperamentsId,
            image,
        );
        res.status(STATUS_OK).json(dog);
    } catch (error) {
        res.status(500).json({ message: error });
    };
}

async function getDogById (req, res) {
    const {id} = req.params;
    try {
        const dog = await getDog(id);
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
            const allDogs = await getAllDogs();
            res.status(STATUS_OK).json(allDogs);
        };
    } catch (error) {
        res.status(500).json({ message: error });
    };
}

module.exports = {
    getDogById,
    postDog,
    getDogs,
};