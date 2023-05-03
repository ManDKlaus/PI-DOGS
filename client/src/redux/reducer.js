import {
    SEARCH_TEMPS,
    SEARCH_DOGS,
    SEARCH_DOG_BY_ID,
    CREATE_DOG,
    REMOVE_DOG,
    ACT_DOGS,
    SEARCH_FAV,
    ADD_FAV,
    REMOVE_FAV,
    FILTER_TEMPS,
    FILTER,
    ORDER,
    RESET,
    NEXT_PAGE,
    PREV_PAGE,
} from "./actions/actionstypes.js";

const initialState = {
    temperaments: [],
    tempsFilt: [],
    allDogs: [],
    dogsShow: [],
    details: {},
    allFavs: [],
    favShow:[],
    removeds: [],
    lifeSpan: [false, false, false, false],
    size: [false, false, false, false],
    location: [],
    numPageDog: 1,
    numPageFav: 1,
};

export default function rootReducer (state=initialState,{type, payload}) {
    switch (type){
        case SEARCH_TEMPS:
            return {
                ...state,
                temperaments: payload,
            }
        case SEARCH_DOGS:
            if (payload.name){
                return {
                    ...state,
                    dogsShow: [payload],
                };
            } else {
                return {
                    ...state,
                    allDogs: payload,
                };
            };
        case SEARCH_DOG_BY_ID:
            return {
                ...state,
                dogsShow: [payload],
            };
        case CREATE_DOG:
            return {
                ...state,
                dogsShow: payload,
                allDogs: [...state.allDogs, payload],
            };
        case REMOVE_DOG:
            const show = state.dogsShow.filter((e)=> e.id !== payload)
            const all = state.allDogs.filter((e)=> e.id !== payload)
            return {
                ...state,
                dogsShow: show,
                allDogs: all,
            };
        case ACT_DOGS:
            return {
                ...state,
                dogsShow: payload[0],
                favShow: payload[1],
            };
        case SEARCH_FAV:
            return {
              ...state,
              favShow: payload,
              allFavs: payload,
            };
        case ADD_FAV:
            const aFav = state.dogsShow.find((e) => e.id === payload);
            const updatedDogsShow = state.dogsShow.map((dog) =>
                dog.id === aFav.id ? { ...dog, isFav: true } : dog
            );
            const updatedAllDogs = state.allDogs.map((dog) =>
                dog.id === aFav.id ? { ...dog, isFav: true } : dog
            );
            return {
                ...state,
                favShow: [...state.favShow, aFav],
                allFavs: [...state.allFavs, aFav],
                dogsShow: updatedDogsShow,
                allDogs: updatedAllDogs,
            };
        case REMOVE_FAV:
            const rFavS = state.favShow.filter((e)=> e.id !== payload)
            const rFavA = state.allFavs.filter((e)=> e.id !== payload)
            return {
                ...state,
                favShow: rFavS,
                allFavs: rFavA,
            };
        case FILTER_TEMPS:
            const newDogs = state.dogsShow.filter(dog => {
                const temps = dog.temperaments;
                return temps.includes(payload);
            });          
            const newFavs = state.favShow.filter(dog => {
                const temps = dog.temperaments;
                return temps.includes(payload);
            });
            return {
                ...state,
                dogsShow: newDogs,
                favShow: newFavs,
            };
        case FILTER:
            const { id, checked } = payload;
            const newLS = [...state.lifeSpan];
            const newS = [...state.size];
            const indexMap = {
                switch1: 0,
                switch2: 1,
                switch3: 2,
                switch4: 3,
                switch5: 4,
                switch6: 5,
                switch7: 6,
                switch8: 7,
            };
            const index = indexMap[id];
            if (index !== undefined) {
                if (checked) {
                newLS[index] = true;
                newS[index + 4] = true;
                } else {
                newLS[index] = false;
                newS[index + 4] = false;
                }
            }
            return {
                ...state,
                lifeSpan: newLS,
                size: newS,
            };
        case ORDER:
            const newOrder1 = state.allDogs.sort((a, b)=>{
                if(a.name > b.name) {
                    return "Ascendente" === payload ? 1 : -1;
                }
                if(a.name < b.name) {
                    return "Descendente" === payload ? 1 : -1;
                }
                return 0;
            });
            const newOrder2 = state.allFavs.sort((a, b)=>{
                if(a.name > b.name) {
                    return "Ascendente" === payload ? 1 : -1;
                }
                if(a.name < b.name) {
                    return "Descendente" === payload ? 1 : -1;
                }
                return 0;
            });
            return {
                ...state,
                dogsShow: newOrder1,  
                favShow: newOrder2,        
            };
        case RESET:
            return {
                ...state,
                lifeSpan: [false, false, false, false],
                size: [false, false, false, false],
                dogsShow: [...state.allDogs],
                favShow: [...state.allFavs],        
            };
        case NEXT_PAGE:
            if(payload === "Favoritos") {
                return {
                    ...state,
                    numPageFav: state.numPageFav + 1,
                };
            }
            return {
                ...state,
                numPageDog: state.numPageDog + 1,
            };
        case PREV_PAGE:
            if(payload === "Favoritos") {
                return {
                    ...state,
                    numPageFav: state.numPageFav - 1,
                };
            }
            return {
                ...state,
                numPageDog: state.numPageDog - 1,
            };
        default:
            return state;
    };
};