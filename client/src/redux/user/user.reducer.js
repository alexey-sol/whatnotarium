import makeFailure from "utils/redux/makeFailure";
import makeSuccess from "utils/redux/makeSuccess";
import types from "./user.types";

function userReducer (state = {}, action = {}) {
    const { payload, type } = action;
    const actionFailure = makeFailure(type);
    const actionSuccess = makeSuccess(type);

    switch (type) {
        case types.UPDATE_PROFILE_FAILURE:
        case types.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                [type]: payload
            };

        case types.UPDATE_PROFILE_RESET:
            return {
                ...state,
                [actionFailure]: null,
                [actionSuccess]: null
            };

        default:
            return state;
    }
}

export default userReducer;
