const axios = require("axios");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

require("dotenv").config() // Objeto process con la propiedad env

const { infoFavs, infoDogs } = require("../utils/functions.js")
const { Favorite, Dog, Temperament } = require("../db.js")
const { API_URL } = process.env;

const searchFav = async () => {
    const dogsDB = await Dog.findAll({
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
    })
    const favs = await Promise.all(
        dogsDB.map(async (e) => {            
            return infoFavs(e);
        })
    );

    const favsDB = await Favorite.findAll();

    for (const fav of favsDB) {
        const dogData = await axios.get(`${API_URL}/${fav.dogId}`);
        const dog = infoDogs(dogData.data);
        dog.isFav = true;
        favs.push(dog);
    }
    console.log("favs",favs)
    return favs;
}

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

const suprFavorite = async (dogId) => {
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
    suprFavorite
};