import {
    SEARCH_TEMPS,
    SEARCH_DOGS,
    SEARCH_DOG_BY_ID,
    CREATE_OR_EDIT_DOG,
    REMOVE_DOG,
    ACT_DOGS,
    SEARCH_FAV,
    ADD_FAV,
    REMOVE_FAV,
    FILTER_TEMPS,
    ORDER,
    RESET,
    SEE_DETAILS,
    EDIT_DOG,
} from "./actions/actionstypes.js";

const initialState = {
    temperaments: [],
    tempsFiltD: [],
    allDogs: [],
    dogsShow: [],
    details: {},
    allFavs: [],
    favShow:[],
    editable: {},
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
            if (payload[1]){
                return {
                    ...state,
                    dogsShow: [...payload[0]],
                };
            };
            return {
                ...state,
                dogsShow: [...payload[0]],
                allDogs: [...payload[0]],
                details: payload[0][0],
            };
        case SEARCH_DOG_BY_ID:
            return {
                ...state,
                dogsShow: [payload],
            };
        case CREATE_OR_EDIT_DOG:
            let newListShow = [...state.dogsShow];
            let newListAll = [...state.allDogs];
            let favListShow = [...state.favShow];
            let favListAll = [...state.allFavs];
            const positionShow = newListShow.findIndex((dog) => dog.id === payload.id);
            const positionAll = newListAll.findIndex((dog) => dog.id === payload.id);
            const posFavShow = favListShow.findIndex((dog) => dog.id === payload.id);
            const posFavAll = favListAll.findIndex((dog) => dog.id === payload.id);
            if (positionShow !== undefined && positionShow !== -1) {
                newListShow[positionShow] = payload;
                newListAll[positionAll] = payload;
                favListShow[posFavShow] = payload;
                favListAll[posFavAll] = payload;
                return {
                    ...state,
                    details: payload,
                    dogsShow: [...newListShow],
                    allDogs: [...newListAll],
                    favShow: posFavShow !== undefined && posFavShow !== -1 ? [...favListShow] : [...state.favShow],
                    allFavs: posFavAll !== undefined && posFavAll !== -1 ? [...favListAll] : [...state.allFavs],
                };
            } else {
                return {
                    ...state,
                    details: payload,
                    dogsShow: [payload, ...newListShow],
                    allDogs: [payload, ...newListAll],
                };
            };
        case REMOVE_DOG:
            const show = state.dogsShow.filter((e)=> e.id !== payload)
            const all = state.allDogs.filter((e)=> e.id !== payload)
            return {
                ...state,
                details: show[0],
                dogsShow: show,
                allDogs: all,
            };
        case ACT_DOGS:
            return {
                ...state,
                dogsShow: payload,
            };
        case SEARCH_FAV:
            return {
              ...state,
              favShow: payload.favorites,
              allFavs: payload.favorites,
            };
        case ADD_FAV:
            const dogId = payload.dogId || payload;
            const aFav = state.dogsShow.find((dog) => dog.id === dogId);
            aFav.isFav = true;
            const actADetails = { ...state.details, isFav: dogId === state.details.id };
            if (state.favShow.findIndex((dog) => dog.id === dogId) !== -1) break;
            return {
                ...state,
                details: actADetails,
                favShow: [...state.favShow, aFav],
                allFavs: [...state.allFavs, aFav],
                dogsShow: state.dogsShow.map((dog) => (dog.id === dogId ? { ...dog, isFav: true } : dog)),
                allDogs: state.allDogs.map((dog) => (dog.id === dogId ? { ...dog, isFav: true } : dog)),
            };
        case REMOVE_FAV:
            let exId;
            /^\d+$/.test(payload) ? exId = parseInt(payload) : exId = payload;
            console.log(payload)
            const rFavS = state.favShow.filter((e)=> e.id !== exId)
            const rFavA = state.allFavs.filter((e)=> e.id !== exId)
            const rFavFS = state.dogsShow.map((dog) => dog.id === exId ? { ...dog, isFav: false } : dog);
            const rFavFA = state.allDogs.map((dog) => dog.id === exId ? { ...dog, isFav: false } : dog);
            let actDetails = state.details;
            if (actDetails.id === exId) actDetails.isFav = false;
            return {
                ...state,
                details: actDetails,
                favShow: rFavS,
                allFavs: rFavA,
                dogsShow: rFavFS,
                allDogs: rFavFA,
            };
        case FILTER_TEMPS:
            if (payload[0]) {
                const newDogs = state.allDogs.filter(dog => {
                    const temps = dog.temperaments;
                    if (temps) {
                        return payload.every(temp => temps.includes(temp));
                    } else {
                        return false;
                    };
                });
                return {
                    ...state,
                    tempsFiltD: newDogs,
                    dogsShow: newDogs,
                };
            };
            return {
                ...state,
                dogsShow: state.allDogs,
            };
        case ORDER:
            const newOrder1 = state.dogsShow.sort((a, b)=>{
                if(a.name > b.name) {
                    return "Ascendente" === payload ? 1 : -1;
                }
                if(a.name < b.name) {
                    return "Descendente" === payload ? 1 : -1;
                }
                return 0;
            });
            const newOrder2 = state.favShow.sort((a, b)=>{
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
                dogsShow: [...state.allDogs],
            };
        case SEE_DETAILS:
            return {
                ...state,
                details: payload,
            };
        case EDIT_DOG:
            return {
                ...state,
                editable: payload,
            };
        default:
            return state;
    };
};