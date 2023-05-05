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
} from "./actionstypes.js";

import axios from "axios";

export function searchTemps () {
    return async (dispatch) => {
        try {
            const temps = (await axios.get('http://localhost:3001/temperaments')).data;
            dispatch({
                type: SEARCH_TEMPS,
                payload: temps,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export function searchDogs (name) {
    return async function (dispatch) {
        let dogs = [];
        try {
            if (name) {
                dogs = (await axios.get(`http://localhost:3001/dogs?name=${name}`)).data;
            } else {
                dogs = (await axios.get("http://localhost:3001/dogs")).data;
            }
            dispatch({
                type: SEARCH_DOGS,
                payload: [dogs, name]
            });
        }catch (error){
            console.error(error);
        }
    };
};

export function searchDogbyId ( dogId ) {
    return async function (dispatch) {
        try {
            const dog = await axios.post(`http://localhost:3001/dogs/${dogId}`);
            dispatch({
                type: SEARCH_DOG_BY_ID,
                payload: dog,
            });
        } catch (error){
            console.error(error);
        }
    };
};

export function createDog ( data ) {
    return async function (dispatch) {
        try {
            const newDog = await axios.post("http://localhost:3001/dogs", data);
            dispatch({
                type: CREATE_DOG,
                payload: newDog,
            });
        } catch (error){
            console.error(error);
        }
    };
};

export function removeDog ( dogId ) {
    return async function (dispatch) {
        try {
            await axios.delete("http://localhost:3001/dogs", dogId);
            dispatch({
                type: REMOVE_DOG,
                payload: dogId,
            });
        } catch (error){
            console.error(error);
        }
    };
};

export function actDogs (dogs) {
    console.log("dogs", dogs)
    return {
        type: ACT_DOGS,
        payload: dogs,
    };
};

export function searchFav () {
    return async function (dispatch) {
        try {
            const favorites = (await axios.get("http://localhost:3001/favorites/")).data;
            dispatch({
                type: SEARCH_FAV,
                payload: favorites,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export function addFav (dogId) {
    return async function (dispatch) {
        try {
            const newFav = (await axios.post("http://localhost:3001/favorites", { dogId: dogId })).data;
            dispatch({
                type: ADD_FAV,
                payload: newFav,
            });
        } catch (error) {
            console.error(error);
        };
    };
};

export function removeFav (dogId) {
    return async function (dispatch) {
        try {
            const idExFav = (await axios.delete(`http://localhost:3001/favorites/${dogId}`)).data;
            dispatch({
                type: REMOVE_FAV,
                payload: idExFav,
            });
        } catch (error) {
            console.error(error);
        };
    };
};

export function filterTemps (temps) {
    return {
        type: FILTER_TEMPS,
        payload: temps,
    };
}

export function filterCards (filtered) {
    return {
        type: FILTER,
        payload: filtered,
    };
};

export function orderCards (order) {
    return {
        type: ORDER,
        payload: order,
    };
};

export function reset () {
    return {
        type: RESET,
    };
};

export function prevPage (cOf) {
    return {
        type: PREV_PAGE,
        payload: cOf,
    };
};
  
export function nextPage (cOf) {
    return {
        type: NEXT_PAGE,
        payload: cOf,
    };
};