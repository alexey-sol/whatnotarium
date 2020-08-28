import {
    FAILURE_POSTFIX as FAILURE,
    START_POSTFIX as START,
    SUCCESS_POSTFIX as SUCCESS,
    USERS_PREFIX as USERS
} from "utils/const/actionTypeAffixes";

export const CREATE_USER_FAILURE = `${USERS} Create User ${FAILURE}`;
export const CREATE_USER_START = `${USERS} Create User ${START}`;
export const CREATE_USER_SUCCESS = `${USERS} Create User ${SUCCESS}`;
export const DELETE_USER_FAILURE = `${USERS} Delete User ${FAILURE}`;
export const DELETE_USER_START = `${USERS} Delete User ${START}`;
export const DELETE_USER_SUCCESS = `${USERS} Delete User ${SUCCESS}`;
export const FETCH_USER_FAILURE = `${USERS} Fetch User ${FAILURE}`;
export const FETCH_USER_START = `${USERS} Fetch User ${START}`;
export const FETCH_USER_SUCCESS = `${USERS} Fetch User ${SUCCESS}`;
export const FETCH_USERS_FAILURE = `${USERS} Fetch User ${FAILURE}`;
export const FETCH_USERS_START = `${USERS} Fetch User ${START}`;
export const FETCH_USERS_SUCCESS = `${USERS} Fetch User ${SUCCESS}`;
export const RESET_USERS_ERROR = `${USERS} Reset Users Error`;
export const UPDATE_USER_FAILURE = `${USERS} Update User ${FAILURE}`;
export const UPDATE_USER_START = `${USERS} Update User ${START}`;
export const UPDATE_USER_SUCCESS = `${USERS} Update User ${SUCCESS}`;
