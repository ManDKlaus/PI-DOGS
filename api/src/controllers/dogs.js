const axios = require("axios");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

require("dotenv").config() // Objeto process con la propiedad env

const { Dog } = require("../db.js")
const {
    API_URL,
    URL_IMAGE,
} = process.env;

const createDogCont = async (
    name,
    weight,
    height,
    lifeSpan,
    temperaments,
    image) => {
        const dog =await Dog.create({
            name,
            weight,
            height,
            lifeSpan,
            temperaments,
            image,
        });
        return dog;
};

const getDog = async (id, aux) => {
    if (aux){
        return await Dog.findByPk(id);
    } else {
        const dogAux = (await axios.get(`${API_URL}/${id}`)).data;
        const dog = infoDogs(dogAux);
        return dog;
    };
};

const getDogsByName = async (name) => {
    const dogsNameAux = (await axios.get(`${API_URL}/search?q=${name}`)).data;    
    const dogsName = dogsNameAux.map(e => infoDogs(e))
    const dogsByNameDB = await Dog.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        }
    });
    return [...dogsName, ...dogsByNameDB];
};

const getAllDogs = async () => {    
    const dogsAux = (await axios.get(`${API_URL}`)).data;    
    const dogs = dogsAux.map(e => infoDogs(e))
    const dogsDB = await Dog.findAll();
    return [...dogs, ...dogsDB];
}

function infoDogs (data){
    if (data) {
        const dog = {
            id: data.id,
            name:data.name,
            weight: data.weight.imperial,
            height: data.height.imperial,
            temperaments: data.temperament,
            lifeSpan: data.life_span,
            image: `${URL_IMAGE}${data.reference_image_id}`,
            isFav: false
        };
        return dog;
    };
}

module.exports = {
    createDogCont,
    getDog,
    getDogsByName,
    getAllDogs,
};