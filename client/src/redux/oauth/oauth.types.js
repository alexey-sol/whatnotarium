import {
    FAILURE_POSTFIX as FAILURE,
    OAUTH_PREFIX as OAUTH,
    START_POSTFIX as START,
    SUCCESS_POSTFIX as SUCCESS
} from "utils/const/actionTypeAffixes";

export const GET_TOKEN_FAILURE = `${OAUTH} Get Token - ${FAILURE}`;
export const GET_TOKEN_START = `${OAUTH} Get Token - ${START}`;
export const GET_TOKEN_SUCCESS = `${OAUTH} Get Token - ${SUCCESS}`;
export const RESET_OAUTH_ERROR = `${OAUTH} Reset Oauth Error`;
