import getActionName from "utils/redux/getActionName";

function pendingReducer (state = {}, action) {
    const { type } = action;
    const actionName = getActionName(type);

    const isStart = type.endsWith("_START");
    const isSuccess = type.endsWith("_SUCCESS");
    const isFailure = type.endsWith("_FAILURE");

    if (isStart) {
        return {
            ...state,
            [actionName]: { pending: true }
        };
    }

    if (isSuccess || isFailure) {
        return {
            ...state,
            [actionName]: { pending: false }
        };
    }

    return state;
}

export default pendingReducer;
