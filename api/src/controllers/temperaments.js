const axios = require("axios");

const { Temperament } = require("../db.js")

async function searchTemperaments() {
  const tempsDB = await Temperament.findAll();
  return await tempsDB;
}

module.exports = {
    searchTemperaments,
};