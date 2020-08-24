import {
    FAILURE_POSTFIX as FAILURE,
    SESSION_PREFIX as SESSION,
    START_POSTFIX as START,
    SUCCESS_POSTFIX as SUCCESS
} from "utils/const/actionTypeAffixes";

export const CHECK_SESSION_FAILURE = `${SESSION} Check Session - ${FAILURE}`;
export const CHECK_SESSION_START = `${SESSION} Check Session - ${START}`;
export const CHECK_SESSION_SUCCESS = `${SESSION} Check Session - ${SUCCESS}`;
export const RESET_CURRENT_USER = `${SESSION} Reset Current User`;
export const RESET_SESSION_ERROR = `${SESSION} Reset Session Error`;
export const SET_CURRENT_USER = `${SESSION} Set Current User`;
export const SIGN_IN_FAILURE = `${SESSION} Sign In - ${FAILURE}`;
export const SIGN_IN_START = `${SESSION} Sign In - ${START}`;
export const SIGN_IN_SUCCESS = `${SESSION} Sign In - ${SUCCESS}`;
export const SIGN_OUT_FAILURE = `${SESSION} Sign Out - ${FAILURE}`;
export const SIGN_OUT_START = `${SESSION} Sign Out - ${START}`;
export const SIGN_OUT_SUCCESS = `${SESSION} Sign Out - ${SUCCESS}`;
export const SIGN_UP_FAILURE = `${SESSION} Sign Up - ${FAILURE}`;
export const SIGN_UP_START = `${SESSION} Sign Up - ${START}`;
export const SIGN_UP_SUCCESS = `${SESSION} Sign Up - ${SUCCESS}`;
