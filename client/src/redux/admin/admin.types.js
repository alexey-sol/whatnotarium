import {
    ADMIN_PREFIX as ADMIN,
    FAILURE_POSTFIX as FAILURE,
    START_POSTFIX as START,
    SUCCESS_POSTFIX as SUCCESS
} from "utils/const/actionTypeAffixes";

export const APPROVE_POST_FAILURE = `${ADMIN} Approve Post - ${FAILURE}`;
export const APPROVE_POST_START = `${ADMIN} Approve Post - ${START}`;
export const APPROVE_POST_SUCCESS = `${ADMIN} Approve Post - ${SUCCESS}`;
export const REJECT_POST_FAILURE = `${ADMIN} Reject Post - ${FAILURE}`;
export const REJECT_POST_START = `${ADMIN} Reject Post - ${START}`;
export const REJECT_POST_SUCCESS = `${ADMIN} Reject Post - ${SUCCESS}`;
export const RESET_ADMIN_ERROR = `${ADMIN} Reset Admin Error`;
