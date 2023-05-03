export function filter(dFilt, fFilt, lifeSpan, size) {
    let dFilt = allDogs;
    let fFilt = allFavs;

    if (lifeSpan[0]) {
        dFilt = filterLifeSpan(dFilt, fFilt, 0, 12);
        fFilt = filterLifeSpan(dFilt, fFilt, 0, 12);
    };
    if (lifeSpan[1]) {
        dFilt = filterLifeSpan(dFilt, fFilt, 13, 14);
        fFilt = filterLifeSpan(dFilt, fFilt, 13, 14);
    };
    if (lifeSpan[2]) {
        dFilt = filterLifeSpan(dFilt, fFilt, 15, 18);
        fFilt = filterLifeSpan(dFilt, fFilt, 15, 18);
    };
    if (lifeSpan[3]) {
        dFilt = filterLifeSpan(dFilt, fFilt, 19);
        fFilt = filterLifeSpan(dFilt, fFilt, 19);
    };
    if (size[0]) {
        dFilt = filterSize(dFilt, fFilt, "toy");
        fFilt = filterSize(dFilt, fFilt, "toy");
    };
    if (size[1]) {
        dFilt = filterSize(dFilt, fFilt, "small");
        fFilt = filterSize(dFilt, fFilt, "small");
    };
    if (size[2]) {
        dFilt = filterSize(dFilt, fFilt, "medium");
        fFilt = filterSize(dFilt, fFilt, "medium");
    };
    if (size[3]) {
        dFilt = filterSize(dFilt, fFilt, "large");
        fFilt = filterSize(dFilt, fFilt, "large");
    };
    return [dFilt, fFilt]
};

function filterSize(dFilt, fFilt, size) {
    const filterDogs = dFilt.filter((dog)=> {
        if (size && dog.size !== size) {
          return false;
        };
        return true;
    });
    const filterFavs = fFilt.filter((dog)=> {
        if (size && dog.size !== size) {
          return false;
        };
        return true;
    });
    return [filterDogs, filterFavs]
};

function filterLifeSpan(dFilt, fFilt, min, max) {
    const filterDogs = dFilt.filter((dog) => {
        const [minLS, maxLS] = dog.lifeSpan.split(' - ').map((age) => Number(age.replace(/\D/g, '')));
        return minLS <= max && maxLS >= min;
    });
    const filterFavs = fFilt.filter((dog) => {
        const [minLS, maxLS] = dog.lifeSpan.split(' - ').map((age) => Number(age.replace(/\D/g, '')));
        return minLS <= max && maxLS >= min;
    });
    return [filterDogs, filterFavs]
};
