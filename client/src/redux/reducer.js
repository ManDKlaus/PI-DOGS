import { 
    SEARCH_DOGS,
    ADD_DOG,
    ACT_DOGS,
    ADD_FAV,
    REMOVE_FAV,
    GET_FAV,
    FILTER,
    ORDER,
    RESET,
    NEXT_PAGE,
    PREV_PAGE,
} from "./actions/actionstypes.js";

const initialState = {
    favShow:[],
    allFav: [],
    dogsShow: [],
    allDogs: [],
    removeds: [],
    status: "",
    gender: "",
    location: [],
    numPageChar: 1,
    numPageFav: 1,
};

export default function rootReducer (state=initialState,{type, payload}) {
    switch (type){
        case ADD_DOG:
            if (Array.isArray(payload)) {
                const favoriteIds = state.allFav.map((fav) => fav.id); // obtienes un array con los ids de los personajes favoritos
                const updatedChars = payload.map((char) => {
                  if (favoriteIds.includes(char.id)) {
                    return { ...char, isFav: true }; // actualizas la propiedad 'isFav' del personaje
                  }
                  return char;
                });
                return {
                    ...state,
                    dogsShow: updatedChars,
                    allDogs: updatedChars,
                };
            }
        case ACT_DOGS:
            return {
                ...state,
                dogsShow: state.dogsShow.map((char) => {
                    if (char.id === payload.id) {
                        return {
                            ...char,
                            isFav: payload.isFav,
                        };
                    }
                    return char;
                }),
            };
        case SEARCH_DOGS:
            return {
                ...state,
                dogsShow: [...payload],
            };
        case GET_FAV:
            const startIndex = (state.numPageFav - 1) * 20;
            const endIndex = state.numPageFav * 20;
            const slicedPayload = payload.slice(startIndex, endIndex);
            return {
              ...state,
              favShow: slicedPayload,
              allFav: payload,
            };
        case ADD_FAV:
            if (state.favShow.length < 20) {
                return {
                    ...state,
                    favShow: payload,
                    allFav: payload,
                };
            }
            return {
                ...state,
                allFav: payload,
            };
        case REMOVE_FAV:
            return {
                ...state,
                favShow: payload,
                allFav: payload,
            };
        case FILTER:
            const { id, value, checked } = payload;
            const key = id === "switch1" || id === "switch2" || id === "switch3" ? "status" : "gender";
            state[key] = checked ? value : "";
            const filterChar = state.allDogs.filter((ch)=> {
                if (state.status && ch.status !== state.status) {
                  return false;
                }
                if (state.gender && ch.gender !== state.gender) {
                  return false;
                }
                return true;
              })
            const filterFav = state.allFav.filter((ch)=> {
                if (state.status && ch.status !== state.status) {
                  return false;
                }
                if (state.gender && ch.gender !== state.gender) {
                  return false;
                }
                return true;
              })
            return {
                ...state,
                dogsShow: filterChar,  
                favShow: filterFav,        
            };
        case ORDER:
            const newOrder1 = state.allDogs.sort((a, b)=>{
                if(a.id > b.id) {
                    return "Ascendente" === payload ? 1 : -1;
                }
                if(a.id < b.id) {
                    return "Descendente" === payload ? 1 : -1;
                }
                return 0;
            });
            const newOrder2 = state.allFav.sort((a, b)=>{
                if(a.id > b.id) {
                    return "Ascendente" === payload ? 1 : -1;
                }
                if(a.id < b.id) {
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
                status:"",
                gender:"",
                dogsShow: [...state.allDogs],
                favShow: [...state.allFav],        
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
            numPageChar: state.numPageChar + 1,
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
            numPageChar: state.numPageChar - 1,
            };
        default:
            return state;
    };
};