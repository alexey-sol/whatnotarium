import getActionName from "utils/helpers/getActionName";

function pendingReducer (state = {}, action) {
    const { type } = action;
    const actionName = getActionName(type);

    if (type.endsWith("_START")) {
        return {
            ...state,
            [actionName]: { pending: true }
        };
    }

    if (type.endsWith("_SUCCESS")) {
        return {
            ...state,
            [actionName]: { pending: false }
        };
    }

    if (type.endsWith("_FAILURE")) {
        return {
            ...state,
            [actionName]: { pending: false }
        };
    }

    return state;
}

export default pendingReducer;
