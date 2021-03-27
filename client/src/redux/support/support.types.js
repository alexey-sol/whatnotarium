import {
    FAILURE_POSTFIX as FAILURE,
    START_POSTFIX as START,
    SUPPORT_PREFIX as SUPPORT,
    SUCCESS_POSTFIX as SUCCESS
} from "utils/const/actionTypeAffixes";

export const CONFIRM_EMAIL_FAILURE = `${SUPPORT} Confirm Email - ${FAILURE}`;
export const CONFIRM_EMAIL_START = `${SUPPORT} Confirm Email - ${START}`;
export const CONFIRM_EMAIL_SUCCESS = `${SUPPORT} Confirm Email - ${SUCCESS}`;
export const CHECK_RESET_TOKEN_FAILURE = `${SUPPORT} Check Reset Token - ${FAILURE}`;
export const CHECK_RESET_TOKEN_START = `${SUPPORT} Check Reset Token - ${START}`;
export const CHECK_RESET_TOKEN_SUCCESS = `${SUPPORT} Check Reset Token - ${SUCCESS}`;
export const RESET_SUPPORT_ERROR = `${SUPPORT} Reset Support Error`;
export const RESET_PASSWORD_FAILURE = `${SUPPORT} Reset Password - ${FAILURE}`;
export const RESET_PASSWORD_START = `${SUPPORT} Reset Password - ${START}`;
export const RESET_PASSWORD_SUCCESS = `${SUPPORT} Reset Password - ${SUCCESS}`;
export const SEND_CONFIRM_TOKEN_FAILURE = `${SUPPORT} Send Confirm Token - ${FAILURE}`;
export const SEND_CONFIRM_TOKEN_START = `${SUPPORT} Send Confirm Token - ${START}`;
export const SEND_CONFIRM_TOKEN_SUCCESS = `${SUPPORT} Send Confirm Token - ${SUCCESS}`;
export const SEND_RESET_TOKEN_FAILURE = `${SUPPORT} Send Reset Token - ${FAILURE}`;
export const SEND_RESET_TOKEN_START = `${SUPPORT} Send Reset Token - ${START}`;
export const SEND_RESET_TOKEN_SUCCESS = `${SUPPORT} Send Reset Token - ${SUCCESS}`;
