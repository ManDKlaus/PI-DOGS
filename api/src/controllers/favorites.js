const axios = require("axios");
const { Sequelize, where } = require('sequelize');
const Op = Sequelize.Op;

require("dotenv").config() // Objeto process con la propiedad env

const { infoId, infoCreated } = require("../utils/functions.js")
const { Favorite, Dog, Temperament } = require("../db.js")
const { API_URL } = process.env;

const searchFav = async () => {
    let favsAPI = []
    const favsDB = await Favorite.findAll();
    for (const fav of favsDB) {
        let dog = (await axios.get(`${API_URL}/${fav.dogId}`)).data;
        dog = await infoId(dog);
        favsAPI.push(dog);
    };
    let dogsDB = await Dog.findAll({
        where: {
            isFav: true 
        },
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });
    const newDogsDB = await Promise.all(
        dogsDB.map((dog) => infoCreated(dog.dataValues))
    );
    const favs = [...newDogsDB, ...favsAPI];
    if (!favs) {
        throw new Error("Favorites not found");
    };
    return [...favs];
};  

const addFavorites = async (dogId) => {
    if (!dogId) {
        throw new Error("Required information to add favorite is missing");
    };
    if (Number.isInteger(dogId)) {
        let existFav = await Favorite.findAll();
        for (let i = 0; i < existFav.length; i++) {
            if (existFav[i].dataValues.dogId === dogId) {
                throw new Error("Favorite already exists");
            }
        }
        const newFav = await Favorite.create({
            dogId: dogId
        });
        return newFav;
    };
    const dog = await Dog.findByPk(dogId);
    if (dog) {
        await dog.update({ isFav: true });
        return dogId;
    };
    throw new Error("Favorite already exists or not exits dog");
};

const eraseFavorite = async (dogId) => {
    if (!dogId) {
        throw new Error("Required information to delete favorite is missing");
    };
    if (/^\d+$/.test(dogId)) {
        let id = parseInt(dogId);
        let existFav = await Favorite.findAll();
        for (let i = 0; i < existFav.length; i++) {
            if (existFav[i].dataValues.dogId === id) {
                await Favorite.destroy({
                    where: {
                        dogId: dogId
                    }
                });
                return dogId;
            };
        };
    };    
    const dog = await Dog.findByPk(dogId);
    if (dog) {
        await dog.update({ isFav: false });
        return dogId;
    };
    throw new Error("Not deleted from favorite: Id not found");
};

module.exports = {
    searchFav,
    addFavorites,
    eraseFavorite
};