import * as types from "./admin.types";
import { ADMIN_PREFIX, FAILURE_POSTFIX, START_POSTFIX } from "utils/const/actionTypeAffixes";
import { deletePostSuccess, updatePostSuccess } from "redux/posts/posts.actions";

export const mapper = ({ dispatch }) => (next) => (action) => {
    const { payload, type } = action;

    const shouldIgnoreAction = (
        payload?.error ||
        !type.startsWith(ADMIN_PREFIX) ||
        type.endsWith(START_POSTFIX) ||
        type.endsWith(FAILURE_POSTFIX)
    );

    if (shouldIgnoreAction) {
        return next(action);
    }

    const { item } = payload;

    if (type === types.APPROVE_POST_SUCCESS || type === types.REJECT_POST_SUCCESS) {
        dispatch(updatePostSuccess(item));
    }

    next(action);
};
