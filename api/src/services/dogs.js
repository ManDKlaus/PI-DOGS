const axios = require("axios");

const { createOrEditDog, eraseDog, searchDogById, searchDogsByName, searchAllDogs } = require("../controllers/dogs")

async function postDog (req, res) {
    const {
        name,
        weight,
        height,
        lifeSpan,
        temperamentsId,
        image,
        id,
    } = req.body;
    try {
        const dog = await createOrEditDog(id, {
            name,
            weight,
            height,
            lifeSpan,
            image,
        }, temperamentsId);
        res.status(200).json(dog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}

async function deleteDog (req, res) {
    const { id } = req.body;
    try {
        await eraseDog(id);
        res.status(200).json({ message: "Dog successfully deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    };
};  


async function getDogById (req, res) {
    const {id} = req.params;
    try {
        const dog = await searchDogById(id);
        res.status(200).json(dog);
    } catch (error) {
        res.status(500).json({ message: "Dog not found" });
    };
}

async function getDogs (req, res) {
    const {name} = req.query;
    try {
        if(name){
            const dogs = await searchDogsByName(name);  
            res.status(200).json(dogs);  
        } else {
            const allDogs = await searchAllDogs();
            res.status(200).json(allDogs);
        };
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}

module.exports = {
    getDogById,
    postDog,
    getDogs,
    deleteDog,
};