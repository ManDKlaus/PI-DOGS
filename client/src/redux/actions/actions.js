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
} from "./actionstypes";

import axios from "axios";

export function addChar (dogs) {
    return {
        type: ADD_DOG,
        payload: dogs,
    };
};

export function actChar (dogs) {
    return {
        type: ACT_DOGS,
        payload: dogs,
    };
}

export function searchCharacter(dog) {
  return {
    type: SEARCH_DOGS,
    payload: dog,
  };
}

export function getFav() {
    return async function (dispatch) {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/rickandmorty/favorites/all`
        );
        return dispatch({
          type: GET_FAV,
          payload: data,
        });
      } catch (error) {
        console.log("getFav not found", error);
      }
    };
  }

export function addFav (props) {
    return async function (dispatch) {
        try {
            const {data} = await axios.post(
                `http://localhost:3001/rickandmorty/favorites`,
                props
            );
            return dispatch({
                type: ADD_FAV,
                payload: data,
            });
        } catch (error) {
            console.log("addFav not found", error);
        };
    };
};

export function removeFav (id) {
    return async function (dispatch) {
        try {
            const {data} = await axios.delete(
                `http://localhost:3001/rickandmorty/favorites/${id}`
            );
            return dispatch({
                type: REMOVE_FAV,
                payload: data, // myFavorites
            });
        } catch (error) {
            console.log("removeFav not found", error);
        };
    };
};

export function filterCards (gender) {
    return {
        type: FILTER,
        payload: gender,
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

export function prevPage(cOf) {
    return {
      type: PREV_PAGE,
      payload: cOf,
    };
  }
  
  export function nextPage(cOf) {
    return {
      type: NEXT_PAGE,
      payload: cOf,
    };
  }
  