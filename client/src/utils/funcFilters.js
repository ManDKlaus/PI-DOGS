export async function filter(allDogs, allFavs, lifeSpan, size) {
    let dFilt = [];
    let fFilt = [];
    if (lifeSpan[0]) {
        dFilt = dFilt.concat(filterLifeSpan(allDogs, 0, 10));
        fFilt = fFilt.concat(filterLifeSpan(allFavs, 0, 10));
    }
    if (lifeSpan[1]) {
        dFilt = dFilt.concat(filterLifeSpan(allDogs, 11, 12));
        fFilt = fFilt.concat(filterLifeSpan(allFavs, 11, 12));
    }
    if (lifeSpan[2]) {
        dFilt = dFilt.concat(filterLifeSpan(allDogs, 13, 14));
        fFilt = fFilt.concat(filterLifeSpan(allFavs, 13, 14));
    }
    if (lifeSpan[3]) {
        dFilt = dFilt.concat(filterLifeSpan(allDogs, 15));
        fFilt = fFilt.concat(filterLifeSpan(allFavs, 15));
    }
    if (size[0]) {
        dFilt = dFilt.concat(filterSize(allDogs, "Toy"));
        fFilt = fFilt.concat(filterSize(allFavs, "Toy"));
    }
    if (size[1]) {
        dFilt = dFilt.concat(filterSize(allDogs, "Small"));
        fFilt = fFilt.concat(filterSize(allFavs, "Small"));
    }
    if (size[2]) {
        dFilt = dFilt.concat(filterSize(allDogs, "Medium"));
        fFilt = fFilt.concat(filterSize(allFavs, "Medium"));
    }
    if (size[3]) {
        dFilt = dFilt.concat(filterSize(allDogs, "Large"));
        fFilt = fFilt.concat(filterSize(allFavs, "Large"));
    }
    
    // Eliminar elementos duplicados
    dFilt = [...new Set(dFilt)];
    fFilt = [...new Set(fFilt)];
  
    if (dFilt.length === 0 && fFilt.length === 0) {
        dFilt = [...allDogs];
        fFilt = [...allFavs];
    }
  
    return [dFilt, fFilt];
}
  


function filterSize(dogs, size) {
    const filterDogs = dogs.filter((dog)=> {
        if (size && dog.size !== size) {
          return false;
        };
        return true;
    });
    console.log("size", filterDogs)
    return filterDogs;
};

function filterLifeSpan(dogs, min, max) {
    const filterDogs = dogs.filter((dog) => {
        const [minLS, maxLS] = dog.lifeSpan && dog.lifeSpan.includes('-') ? dog.lifeSpan.split(' - ').map((age) => Number(age.replace(/\D/g, ''))) : [0, 0];
        return minLS <= max && maxLS >= min;
    });
    console.log("life", filterDogs)
    return filterDogs;
};
