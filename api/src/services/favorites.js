const axios = require("axios");

const { searchFav, addFavorites, eraseFavorite } = require("../controllers/favorites")

async function getFavorites (req, res) {
    try {
        const favorites = await searchFav();
        res.status(200).json({ favorites });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function postFavorites (req, res) {
    const { dogId } = req.body;
    try {
        const newFav = await addFavorites(dogId);
        res.status(200).json(newFav);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function deleteFavorite (req, res) {
    const { id } = req.params;
    try {
        const idExFav = await eraseFavorite(id);
        res.status(200).json(idExFav);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getFavorites,
    postFavorites,
    deleteFavorite
};