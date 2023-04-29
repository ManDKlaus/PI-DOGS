require("dotenv").config();
const { Favorite } = require("../db.js");
const { URL_IMAGE } = process.env;

async function infoDogs (data){
    if (data) {
        let dog = {
            id: data.id,
            name:data.name,
            weight: data.weight.imperial,
            height: data.height.imperial,
            temperaments: data.temperament,
            lifeSpan: data.life_span,
            image: `${URL_IMAGE}${data.reference_image_id}`,
            isFav: false
        };
        dog = await isFavTrue(dog);
        return dog;
    };
}

function infoFavs (data){
    if (data) {
        const dog = {
            id: data.id,
            name:data.name,
            weight: data.weight,
            height: data.height,
            temperaments: data.temperaments,
            lifeSpan: data.lifeSpan,
            image: data.image,
            isFav: true
        };
        return dog;
    };
};

async function isFavTrue (dog) {
    const favorite = await Favorite.findOne({
        where: {
            dogId: dog.id 
        }
    });
    if (favorite) {
        dog.isFav = true;
    };
    return dog;
};

module.exports = {
    infoDogs,
    infoFavs,
    isFavTrue,
};