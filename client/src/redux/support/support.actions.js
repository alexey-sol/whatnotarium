import * as types from "./support.types";

export function confirmEmailFailure (error) {
    return {
        payload: { error },
        type: types.CHECK_RESET_TOKEN_FAILURE
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

export function resetPasswordFailure (error) {
    return {
        payload: { error },
        type: types.RESET_PASSWORD_FAILURE
    };
}

export function resetPasswordStart (token, cb) {
    return {
        cb,
        payload: token,
        type: types.RESET_PASSWORD_START
    };
}

export function resetPasswordSuccess () {
    return {
        type: types.RESET_PASSWORD_SUCCESS
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

export function sendResetTokenFailure (error) {
    return {
        payload: { error },
        type: types.SEND_RESET_TOKEN_FAILURE
    };
}

export function sendResetTokenStart (payload, cb) {
    return {
        cb,
        payload,
        type: types.SEND_RESET_TOKEN_START
    };
}

export function sendResetTokenSuccess () {
    return {
        type: types.SEND_RESET_TOKEN_SUCCESS
    };
}
