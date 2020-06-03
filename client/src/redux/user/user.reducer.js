import types from "./user.types";

const INITIAL_STATE = {
    updatedProfile: {
        error: null,
        isFetching: false,
        item: null
    },
    users: {}
};

function userReducer (state = INITIAL_STATE, action = {}) {
    const { payload, type } = action;

    switch (type) {
        case types.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                updatedProfile: {
                    error: payload,
                    isFetching: false,
                    item: null
                }
            };

        case types.UPDATE_PROFILE_RESET:
            return {
                ...state,
                updatedProfile: {
                    error: null,
                    isFetching: false,
                    item: null
                }
            };

        case types.UPDATE_PROFILE_START:
            return {
                ...state,
                updatedProfile: {
                    error: null,
                    isFetching: true,
                    item: null
                }
            };

        case types.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updatedProfile: {
                    error: null,
                    isFetching: false,
                    item: payload
                }
            };

        default:
            return state;
    }
}

export default userReducer;
