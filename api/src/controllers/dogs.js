const axios = require("axios");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

require("dotenv").config() // Objeto process con la propiedad env

const { infoDogs, isFavTrue } = require("../utils/functions.js")
const { Dog, Temperament, Favorite } = require("../db.js")
const { API_URL } = process.env;

const createDog = async (
    name,
    weight,
    height,
    lifeSpan,
    temperamentsId,
    image
) => {
    const dog = await Dog.create({
        name,
        weight,
        height,
        lifeSpan,
        image
    });

    // Añadir la relación con los temperamentos
    await dog.addTemperaments(temperamentsId);

    const dogCreated = await Dog.findAll({
        where: {
            name,
        },
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });     
    return dogCreated;
};

const getDog = async (id) => {
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

const getDogsByName = async (name) => {
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
    return [...dogsName, ...dogsByNameDB];
};

const getAllDogs = async () => {
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
    return [...dogsAPI, ...dogsDB];
}

module.exports = {
    createDog,
    getDog,
    getDogsByName,
    getAllDogs,
};