const axios = require("axios");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

require("dotenv").config() // Objeto process con la propiedad env

const { infoDogs, isFavTrue } = require("../utils/functions.js")
const { Dog, Temperament, Favorite } = require("../db.js")
const { API_URL } = process.env;

const createOrEditDog = async (id, dog, temperamentsId) => {
    let createdDog;
  
    if (!id) {
      createdDog = await Dog.create(dog);
    } else {
      createdDog = await Dog.findByPk(id);
      if (createdDog) {
        await createdDog.update(dog);
      } else {
        throw new Error("Dog not found");
      }
    }
  
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

    if (!dogCreated) {
      throw new Error("Failed to create or edit dog");
    }
  
    return dogCreated;
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
        return dog;
    } else {
        let dog = (await axios.get(`${API_URL}/${id}`)).data;
        dog = infoDogs(dog);
        return dog;
    };
};

const searchDogsByName = async (name) => {
    const dogsNameAux = (await axios.get(`${API_URL}/search?q=${name}`)).data;    
    const dogsName = await Promise.all(dogsNameAux.map(e => infoDogs(e)));
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
    const dogs = [...dogsName, ...dogsByNameDB]
    if (!dogs) {        
        throw new Error("DogsByName not found");
    }
    return dogs;
};

const searchAllDogs = async () => {
    let dogsAPI = (await axios.get(`${API_URL}`)).data;
    dogsAPI = await Promise.all(dogsAPI.map(e => infoDogs(e)));

    const dogsDB = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });
    const dogs = [...dogsAPI, ...dogsDB]
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