import * as types from "./admin.types";

export function approvePostFailure (error) {
    return {
        payload: { error },
        type: types.APPROVE_POST_FAILURE
    };
}

export function approvePostStart (payload, cb) {
    return {
        cb,
        payload,
        type: types.APPROVE_POST_START
    };
}

export function approvePostSuccess (item) {
    return {
        payload: { item },
        type: types.APPROVE_POST_SUCCESS
    };
}

export function rejectPostFailure (error) {
    return {
        payload: { error },
        type: types.REJECT_POST_FAILURE
    };
}

export function rejectPostStart (payload, cb) {
    return {
        cb,
        payload,
        type: types.REJECT_POST_START
    };
}

export function rejectPostSuccess (item) {
    return {
        payload: { item },
        type: types.REJECT_POST_SUCCESS
    };
}

export function resetAdminError () {
    return {
        type: types.RESET_ADMIN_ERROR
    };
}
