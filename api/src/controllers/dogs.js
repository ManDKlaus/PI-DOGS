const axios = require("axios");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

require("dotenv").config() // Objeto process con la propiedad env

const { infoAPI, infoId, infoAPIByName, infoCreated } = require("../utils/functions.js")
const { Dog, Temperament } = require("../db.js")
const { API_URL } = process.env;

const createOrEditDog = async (id, dog, temperaments) => {
    let createdDog;

    const temperamentsId = await Promise.all(temperaments.map(name => {
        return Temperament.findOrCreate({
            where: { name },
            defaults: { name }
        }).then(([temperament]) => temperament.id);
    }));
  
    if (!id) {
        createdDog = await Dog.create(dog);
    } else {
        createdDog = await Dog.findByPk(id);
        if (createdDog) {
            await createdDog.update(dog);
        } else {
            throw new Error("Error edit: Dog not found");
        };
    };
  
    await createdDog.setTemperaments(temperamentsId);
  
    const dogCreated = await Dog.findByPk(createdDog.id, {
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
            attributes: [],
            },
        },
    });

    const newDog = await infoCreated(dogCreated.dataValues);

    if (!dogCreated) {
        throw new Error("Failed to create dog");
    }
  
    return newDog;
};

const eraseDog = async (id) => {
    const deletedDog = await Dog.destroy({ where: { id } });
    if (!deletedDog) {
        throw new Error("Dog not found.");
    }
};

const searchDogById = async (id) => {
    if (isNaN(id)){
        const dog = await Dog.findByPk(id, {
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        });
        const newDog = await infoCreated(dog.dataValues);
        return newDog;
    } else {
        let dog = (await axios.get(`${API_URL}/${id}`)).data;
        dog = infoId(dog);
        return dog;
    };
};

const searchDogsByName = async (name) => {
    const dogsNameAux = (await axios.get(`${API_URL}/search?q=${name}`)).data;    
    const dogsName = await Promise.all(dogsNameAux.map(e => infoAPIByName(e)));
    const dogsByNameDB = await Dog.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        },
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });
    const newDogsDB = await Promise.all(dogsByNameDB.map(dog => Promise.resolve(infoCreated(dog.dataValues))));
    const dogs = [...newDogsDB, ...dogsName]
    if (!dogs) {        
        throw new Error("DogsByName not found");
    }
    return dogs;
};

const searchAllDogs = async () => {
    let dogsAPI = (await axios.get(`${API_URL}`)).data;

    dogsAPI = await Promise.all(dogsAPI.map(dog => infoAPI(dog)));
    
    const temperaments = new Set(
        await dogsAPI.flatMap((dog) =>
        dog.temperaments ? dog.temperaments : []
        ).filter((temp) => temp !== "").sort()
    );

    await Promise.all([...temperaments].map((name) =>
        Temperament.findOrCreate({ where: { name } })
    ));

    const dogsDB = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });
    const newDogsDB = await Promise.all(dogsDB.map(dog => Promise.resolve(infoCreated(dog.dataValues))));
    const dogs = [...newDogsDB, ...dogsAPI]
    if (!dogs) {        
        throw new Error("AllDogs not found");
    }
    return dogs;
}

module.exports = {
    createOrEditDog,
    eraseDog,
    searchDogById,
    searchDogsByName,
    searchAllDogs,
};