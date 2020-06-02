import _ from "lodash";

import types from "./post.types";

function postReducer (state = getInitialState(), action = {}) {
    const { payload, type } = action;

    switch (type) {
        case types.CREATE_POST_FAILURE:
            return {
                ...state,
                createdPost: {
                    error: payload,
                    isFetching: false,
                    item: null
                }
            };

        case types.CREATE_POST_RESET:
            return {
                ...state,
                createdPost: {
                    error: null,
                    isFetching: false,
                    item: null
                }
            };

        case types.CREATE_POST_SUCCESS:
            return {
                ...state,
                createdPost: {
                    error: null,
                    isFetching: false,
                    item: payload
                }
            };

        case types.DELETE_POST_FAILURE:
            return {
                ...state,
                deletedPost: {
                    error: payload,
                    isFetching: false,
                    item: null
                }
            };

        case types.DELETE_POST_RESET:
            return {
                ...state,
                deletedPost: {
                    error: null,
                    isFetching: false,
                    item: null
                }
            };

        case types.DELETE_POST_SUCCESS:
            return {
                ...state,
                deletedPost: {
                    error: null,
                    isFetching: false,
                    item: payload
                },
                post: null,
                posts: {
                    ..._.omit(state.posts, payload.id)
                }
            };

        case types.FETCH_POST_FAILURE:
            return {
                ...state,
                fetchedPost: {
                    error: payload,
                    isFetching: false,
                    item: null
                }
            };

        case types.FETCH_POST_RESET:
            return {
                ...state,
                fetchedPost: {
                    error: null,
                    isFetching: false,
                    item: null
                }
            };

        case types.FETCH_POST_SUCCESS:
            return {
                ...state,
                fetchedPost: {
                    error: null,
                    isFetching: false,
                    item: payload
                }
            };

        case types.FETCH_POSTS_FAILURE:
            return {
                ...state,
                fetchedPosts: {
                    error: payload,
                    isFetching: false,
                    items: []
                }
            };

        case types.FETCH_POSTS_RESET:
            return {
                ...state,
                fetchedPosts: {
                    error: null,
                    isFetching: false,
                    items: []
                }
            };

        case types.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                fetchedPosts: {
                    error: null,
                    isFetching: false,
                    items: payload
                },
                posts: _.mapKeys(payload, "id")
            };

        case types.GET_POST:
            return {
                ...state,
                post: state.posts[payload]
            };

        case types.UPDATE_POST_FAILURE:
            return {
                ...state,
                updatedPost: {
                    error: payload,
                    isFetching: false,
                    item: null
                }
            };

        case types.UPDATE_POST_RESET:
            return {
                ...state,
                updatedPost: {
                    error: null,
                    isFetching: false,
                    item: null
                }
            };

        case types.UPDATE_POST_SUCCESS:
            return {
                ...state,
                updatedPost: {
                    error: null,
                    isFetching: false,
                    item: payload
                },
                post: payload,
                posts: {
                    ...state.posts,
                    [payload.id]: payload
                }
            };

        default:
            return state;
    }
}

export default postReducer;

function getInitialState () {
    return {
        createdPost: {
            error: null,
            isFetching: false,
            item: null
        },
        deletedPost: {
            error: null,
            isFetching: false,
            item: null
        },
        fetchedPost: {
            error: null,
            isFetching: false,
            item: null
        },
        fetchedPosts: {
            error: null,
            isFetching: false,
            items: []
        },
        post: null,
        posts: {}, // TODO: maybe use Map?
        updatedPost: {
            error: null,
            isFetching: false,
            item: null
        }
    };
}
