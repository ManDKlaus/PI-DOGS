const axios = require("axios");

require("dotenv").config() // Objeto process con la propiedad env
const { searchFav, addFavorites, suprFavorite } = require("../controllers/favorites")
const {
    STATUS_OK,
    STATUS_ERROR,
} = process.env;

async function postFavorites (req, res) {
    const {id} = req.body;
    try {
        const newFav = addFavorites(id);
        if (newFav) {
            res.status(STATUS_OK).json({ message: "Add to Favorites"});
        } else {
            res.status(STATUS_OK).json({ message: "Error add to Favorites"});
        }
    } catch (error) {
        res.status(STATUS_ERROR).json({ message: error });
    }
};

const deleteFavorite = async (req, res) => {
    const {id} = req.body;
    try {
        const oldFav = await suprFavorite(id);
        if (oldFav) {
            res.status(STATUS_OK).json({ message: "Favorite has been deleted" });
        } else {
            res.status(STATUS_OK).json({ message: "Deletion of favorite has encountered an error"});
        }
    } catch (error) {
        res.status(STATUS_ERROR).json({ message: error });
    }

}

async function getFavorites (req, res) {
    try {
        const favorites = await searchFav();
        res.status(STATUS_OK).json({ favorites });
    } catch (error) {
        res.status(STATUS_ERROR).json({ message: error });
    }
};

module.exports = {
    getFavorites,
    postFavorites,
    deleteFavorite
};