const axios = require("axios");

const { searchFav, addFavorites, eraseFavorite } = require("../controllers/favorites")

async function postFavorites (req, res) {
    const {id} = req.body;
    try {
        const newFav = addFavorites(id);
        res.status(200).json({ message: "Add to Favorites"});
    } catch (error) {
        res.status(500).json({ message: "Not added to Favorites: Id not found" });
    }
};

const deleteFavorite = async (req, res) => {
    const {id} = req.body;
    try {
        const oldFav = await eraseFavorite(id);
        res.status(200).json({ message: "Favorite has been deleted" });
    } catch (error) {
        res.status(500).json({ message: "Not deleted of favorite: Id not found"});
    }

}

async function getFavorites (req, res) {
    try {
        const favorites = await searchFav();
        res.status(200).json({ favorites });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFavorites,
    postFavorites,
    deleteFavorite
};