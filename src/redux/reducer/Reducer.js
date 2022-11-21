import { act } from "react-test-renderer";
import { ADD_ITEM, CLEAR_ALL, REMOVE_ITEM } from "../ActionTypes";

const initialState = {
    watchLaterList: []
}

export const Reducers = (state = initialState, action) => {
    console.log('action: ', action)
    console.log('act: ', action.payload)

    switch (action.type) {

        case ADD_ITEM:
            return {
                ...state,
                watchLaterList: [...state.watchLaterList, action.payload]
            };

        case REMOVE_ITEM:
            return {
                watchLaterList: [
                    ...state.watchLaterList.filter(movie => movie.id !== action.payload.id)
                ]
            };

        case CLEAR_ALL:
            return {
                watchLaterList: []
            };

        default:
            return state;
    }
};