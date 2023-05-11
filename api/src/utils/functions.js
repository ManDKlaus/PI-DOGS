require("dotenv").config();
const { Favorite } = require("../db.js");
const { URL_IMAGE } = process.env;

async function infoAPI (data){
    if (data) {
        let dog = {
            id: data.id,
            name:data.name,
            weight: data.weight.imperial,
            height: data.height.imperial,
            temperaments: data.temperament?.split(", "),
            lifeSpan: data.life_span,
            image: data.image.url,
            isFav: await isFavTrue(data.id),
            size: await getSize(data.weight.imperial, data.height.imperial)
        };
        return dog;
    };
};

async function infoAPIByName (data){
    if (data) {
        let dog = {
            id: data.id,
            name:data.name,
            weight: data.weight.imperial,
            height: data.height.imperial,
            temperaments: data.temperament?.split(", "),
            lifeSpan: data.life_span,
            image:`${URL_IMAGE}${data.reference_image_id}.jpg`,
            isFav: await isFavTrue(data.id),
            size: await getSize(data.weight.imperial, data.height.imperial)
        };
        return dog;
    };
};

async function infoId (data){
    if (data) {
        let dog = {
            id: data.id,
            name:data.name,
            weight: data.weight.imperial,
            height: data.height.imperial,
            temperaments: data.temperament?.split(", "),
            lifeSpan: data.life_span,
            image:`${URL_IMAGE}${data.reference_image_id}.jpg`,
            isFav: await isFavTrue(data.id),
            size: await getSize(data.weight.imperial, data.height.imperial)
        };
        return dog;
    };
};

async function infoCreated (data) {
    if (data) {
        let dog = {
            id: data.id,
            name:data.name,
            weight: data.weight,
            height: data.height,
            temperaments: data.temperaments.map(t => t.dataValues.name),
            lifeSpan: data.lifeSpan,
            image: data.image,
            isFav: data.isFav,
            size: await getSize(data.weight, data.height),
            created: data.created,
        };
        return dog;
    };
};

async function isFavTrue (id) {    
    const favsDB = await Favorite.findAll();
    for (let i = 0; i < favsDB.length; i++) {
        if (favsDB[i].dogId === id) {
            return true;;
        };
    };
    return false;
};

async function getSize(weight, height) {
    const weightAverage = await getAverage(weight);
    const heightAverage = await getAverage(height);
    if (weightAverage < 15 && heightAverage < 12) {
      return "Toy";
    } else if (weightAverage < 22 && heightAverage < 16) {
      return "Small";
    } else if (weightAverage < 45 && heightAverage < 22) {
      return "Medium";
    } else {
      return "Large";
    };
};

async function getAverage(string) {    
    const [num1, num2] = string.split(" - ").map(num => parseInt(num));
    const average = (num1 + num2) / 2;
    return average;
};

module.exports = {
    infoAPI,
    infoAPIByName,
    isFavTrue,
    infoId,
    infoCreated
};