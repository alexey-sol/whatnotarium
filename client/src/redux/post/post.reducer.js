import {
    CREATE_POST_FAILURE,
    CREATE_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_POST_SUCCESS,
    GET_POSTS_FAILURE,
    GET_POSTS_SUCCESS,
    RESET_POST,
    RESET_POST_ERROR,
    UPDATE_POST_FAILURE,
    UPDATE_POST_SUCCESS
} from "./post.types";

const INITIAL_STATE = {
    error: null,
    post: null,
    posts: []
};

function postReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case CREATE_POST_FAILURE:
        case GET_POST_FAILURE:
        case GET_POSTS_FAILURE:
        case UPDATE_POST_FAILURE:
            return {
                ...state,
                error: payload
            };

        case CREATE_POST_SUCCESS:
        case GET_POST_SUCCESS:
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                error: null,
                post: payload
            };

        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: payload,
                error: null
            };

        case RESET_POST:
            return {
                ...state,
                post: null
            };

        case RESET_POST_ERROR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

export default postReducer;
