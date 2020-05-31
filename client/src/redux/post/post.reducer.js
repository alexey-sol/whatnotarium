import makeFailure from "utils/redux/makeFailure";
import makeSuccess from "utils/redux/makeSuccess";
import types from "./post.types";

function getNewStateWithoutErrors (state) {
    const newState = {};

    Object.entries(state).forEach(([key, value]) => {
        const isFailure = key.endsWith("_FAILURE");

        if (!isFailure) {
            newState[key] = value;
        }
    });

    return newState;
}

function postReducer (state = {}, action = {}) {
    const { payload, type } = action;
    const actionFailure = makeFailure(type);
    const actionSuccess = makeSuccess(type);

    switch (type) {
        case types.CLEAR_ALL_ERRORS:
            return getNewStateWithoutErrors(state);

        case types.CREATE_POST_FAILURE:
        case types.CREATE_POST_SUCCESS:
        case types.DELETE_POST_FAILURE:
        case types.DELETE_POST_SUCCESS:
        case types.GET_POST_FAILURE:
        case types.GET_POST_SUCCESS:
        case types.GET_POSTS_FAILURE:
        case types.GET_POSTS_SUCCESS:
        case types.UPDATE_POST_FAILURE:
        case types.UPDATE_POST_SUCCESS:
            return {
                ...state,
                [type]: payload
            };

        case types.CREATE_POST_RESET:
        case types.DELETE_POST_RESET:
        case types.GET_POST_RESET:
        case types.GET_POSTS_RESET:
        case types.UPDATE_POST_RESET:
            return {
                ...state,
                [actionFailure]: null,
                [actionSuccess]: null
            };

        default:
            return state;
    }
}

export default postReducer;
