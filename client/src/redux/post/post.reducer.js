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
                    isPending: false,
                    item: null
                }
            };

        case types.CREATE_POST_RESET:
            return {
                ...state,
                createdPost: {
                    error: null,
                    isPending: false,
                    item: null
                }
            };

        case types.CREATE_POST_START:
            return {
                ...state,
                createdPost: {
                    error: null,
                    isPending: true,
                    item: null
                }
            };

        case types.CREATE_POST_SUCCESS:
            return {
                ...state,
                createdPost: {
                    error: null,
                    isPending: false,
                    item: payload
                },
                post: payload,
                posts: {
                    ...state.posts,
                    [payload.id]: payload
                }
            };

        case types.DELETE_POST_FAILURE:
            return {
                ...state,
                deletedPost: {
                    error: payload,
                    isPending: false,
                    item: null
                }
            };

        case types.DELETE_POST_RESET:
            return {
                ...state,
                deletedPost: {
                    error: null,
                    isPending: false,
                    item: null
                }
            };

        case types.DELETE_POST_START:
            return {
                ...state,
                deletedPost: {
                    error: null,
                    isPending: true,
                    item: null
                }
            };

        case types.DELETE_POST_SUCCESS:
            return {
                ...state,
                deletedPost: {
                    error: null,
                    isPending: false,
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
                    isPending: false,
                    item: null
                }
            };

        case types.FETCH_POST_RESET:
            return {
                ...state,
                fetchedPost: {
                    error: null,
                    isPending: false,
                    item: null
                }
            };

        case types.FETCH_POST_START:
            return {
                ...state,
                fetchedPost: {
                    error: null,
                    isPending: true,
                    item: null
                }
            };

        case types.FETCH_POST_SUCCESS:
            return {
                ...state,
                fetchedPost: {
                    error: null,
                    isPending: false,
                    item: payload
                }
            };

        case types.FETCH_POSTS_FAILURE:
            return {
                ...state,
                fetchedPosts: {
                    error: payload,
                    isPending: false,
                    items: [],
                    totalCount: 0
                }
            };

        case types.FETCH_POSTS_RESET:
            return {
                ...state,
                fetchedPosts: {
                    error: null,
                    isPending: false,
                    items: [],
                    totalCount: 0
                }
            };

        case types.FETCH_POSTS_START:
            return {
                ...state,
                fetchedPosts: {
                    error: null,
                    isPending: true,
                    items: [],
                    totalCount: 0
                }
            };

        case types.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                fetchedPosts: {
                    error: null,
                    isPending: false,
                    items: payload.items,
                    totalCount: payload.totalCount
                },
                posts: _.mapKeys(payload.items, "id")
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
                    isPending: false,
                    item: null
                }
            };

        case types.UPDATE_POST_RESET:
            return {
                ...state,
                updatedPost: {
                    error: null,
                    isPending: false,
                    item: null
                }
            };

        case types.UPDATE_POST_START:
            return {
                ...state,
                updatedPost: {
                    error: null,
                    isPending: true,
                    item: null
                }
            };

        case types.UPDATE_POST_SUCCESS:
            return {
                ...state,
                updatedPost: {
                    error: null,
                    isPending: false,
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
            isPending: false,
            item: null
        },
        deletedPost: {
            error: null,
            isPending: false,
            item: null
        },
        fetchedPost: {
            error: null,
            isPending: false,
            item: null
        },
        fetchedPosts: {
            error: null,
            isPending: false,
            items: [],
            totalCount: 0
        },
        post: null,
        posts: {},
        updatedPost: {
            error: null,
            isPending: false,
            item: null
        }
    };
}
