import {
    FAILURE_POSTFIX as FAILURE,
    START_POSTFIX as START,
    SUPPORT_PREFIX as SUPPORT,
    SUCCESS_POSTFIX as SUCCESS
} from "utils/const/actionTypeAffixes";

export const CONFIRM_EMAIL_FAILURE = `${SUPPORT} Confirm Email - ${FAILURE}`;
export const CONFIRM_EMAIL_START = `${SUPPORT} Confirm Email - ${START}`;
export const CONFIRM_EMAIL_SUCCESS = `${SUPPORT} Confirm Email - ${SUCCESS}`;
export const RESET_SUPPORT_ERROR = `${SUPPORT} Reset Support Error`;
export const RESTORE_PASSWORD_FAILURE = `${SUPPORT} Restore Password - ${FAILURE}`;
export const RESTORE_PASSWORD_START = `${SUPPORT} Restore Password - ${START}`;
export const RESTORE_PASSWORD_SUCCESS = `${SUPPORT} Restore Password - ${SUCCESS}`;
export const SEND_CONFIRM_TOKEN_FAILURE = `${SUPPORT} Send Confirm Token - ${FAILURE}`;
export const SEND_CONFIRM_TOKEN_START = `${SUPPORT} Send Confirm Token - ${START}`;
export const SEND_CONFIRM_TOKEN_SUCCESS = `${SUPPORT} Send Confirm Token - ${SUCCESS}`;
