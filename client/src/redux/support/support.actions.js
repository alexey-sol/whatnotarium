import * as types from "./support.types";

export function confirmEmailFailure (error) {
    return {
        payload: { error },
        type: types.CONFIRM_EMAIL_FAILURE
    };
}

export function confirmEmailStart (token, cb) {
    return {
        cb,
        payload: token,
        type: types.CONFIRM_EMAIL_START
    };
}

export function confirmEmailSuccess (item) {
    return {
        payload: { item },
        type: types.CONFIRM_EMAIL_SUCCESS
    };
}

export function restorePasswordFailure (error) {
    return {
        payload: { error },
        type: types.RESTORE_PASSWORD_FAILURE
    };
}

export function restorePasswordStart (payload, cb) {
    return {
        cb,
        payload,
        type: types.RESTORE_PASSWORD_START
    };
}

export function restorePasswordSuccess () {
    return {
        type: types.RESTORE_PASSWORD_SUCCESS
    };
}

export function sendConfirmTokenFailure (error) {
    return {
        payload: { error },
        type: types.SEND_CONFIRM_TOKEN_FAILURE
    };
}

export function sendConfirmTokenStart (payload, cb) {
    return {
        cb,
        payload,
        type: types.SEND_CONFIRM_TOKEN_START
    };
}

export function sendConfirmTokenSuccess () {
    return {
        type: types.SEND_CONFIRM_TOKEN_SUCCESS
    };
}
