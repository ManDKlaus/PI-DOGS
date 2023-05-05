const axios = require("axios");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

require("dotenv").config() // Objeto process con la propiedad env

const { infoId } = require("../utils/functions.js")
const { Favorite, Dog, Temperament } = require("../db.js")
const { API_URL } = process.env;

const searchFav = async () => {    
    const favs = [];
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
    if(dogsDB) {
    dogsDB = dogsDB.map((e) => favs.push(e));
    }
    const favsDB = await Favorite.findAll();
    for (const fav of favsDB) {
        let dog = (await axios.get(`${API_URL}/${fav.dogId}`)).data;
        dog = await infoId(dog);
        favs.push(dog);
    };
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
    const dog = await Dog.findOne({
        where: {
            id: dogId
        }
    });
    if (dog && dog[0].isFav === false) {
        dog.isFav = true;
        await dog.save();
        return dog.id;
    }
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
    const dogsDB = await Dog.findAll();
    for (const dog of dogsDB) {
        if (dog.id === dogId) {
            dog.isFav = false;
            await dog.save();
            return dog.id;
        };
    };
    throw new Error("Not deleted from favorite: Id not found");
};

module.exports = {
    searchFav,
    addFavorites,
    eraseFavorite
};