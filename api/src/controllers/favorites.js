const axios = require("axios");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

require("dotenv").config() // Objeto process con la propiedad env

const { infoFavs, infoDogs } = require("../utils/functions.js")
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
    dogsDB = await Promise.all(
        dogsDB.map(async (e) => { 
            favs.push(infoFavs(e));
        })
    );
    const favsDB = await Favorite.findAll();

    for (const fav of favsDB) {
        let dog = (await axios.get(`${API_URL}/${fav.dogId}`)).data;
        dog = await infoDogs(dog);
        favs.push(dog);
    };
    if (!favs) {
        throw new Error("Favorites not found");
    };
    return favs;
};

const addFavorites = async (dogId) => {  
    if (Number.isInteger(dogId)) {
        await Favorite.create({
            dogId: dogId
        });
        return true;
    } else {
        const dog = await Dog.findByPk(dogId);
        dog.isFav = true;
        await dog.save();
        return true;
    };
    return false;
};

const eraseFavorite = async (dogId) => {
    const dog = await Dog.findByPk(dogId);
  
    if (dog) {
      dog.isFav = false;
      await dog.save();
      return true;
    } else {
      await Favorite.destroy({
        dogId: dogId
      });
      return true;
    };
    return false;
}

module.exports = {
    searchFav,
    addFavorites,
    eraseFavorite
};