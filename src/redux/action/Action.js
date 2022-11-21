import { ADD_ITEM, CLEAR_ALL, REMOVE_ITEM } from "../ActionTypes"

export const addItemToCart = (data) => ({
    type: ADD_ITEM,
    payload: data,
});

export const removeMovieFromRedux = (data) => ({
    type: REMOVE_ITEM,
    payload: data,
});

export const clearAllMovies = (data) => ({
    type: CLEAR_ALL,
    payload: data,
});