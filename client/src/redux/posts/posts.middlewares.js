import * as types from "./posts.types";
import { FAILURE_POSTFIX, POSTS_PREFIX, START_POSTFIX } from "utils/const/actionTypeAffixes";
import convertItemsArrayToMap from "utils/redux/convertItemsArrayToMap";
import complementPayload from "utils/redux/complementPayload";

export const postsNormalizer = () => (next) => (action) => {
    const { payload, type } = action;
    const actionWithNormalizedPayload = { ...action };
    const shouldIgnoreAction = payload?.error || !type.startsWith(POSTS_PREFIX);

    if (shouldIgnoreAction) {
        return next(action);
    }

    if (type === types.FETCH_POSTS_SUCCESS) {
        actionWithNormalizedPayload.payload = {
            ...payload,
            items: convertItemsArrayToMap(payload.items)
        };
    }

    next(actionWithNormalizedPayload);
};

// TODO: posts and users have the same middlewares
export const postsEnricher = ({ getState }) => (next) => (action) => {
    const { payload, type } = action;

    const shouldIgnoreAction = (
        payload?.error ||
        !type.startsWith(POSTS_PREFIX) ||
        type.endsWith(START_POSTFIX) ||
        type.endsWith(FAILURE_POSTFIX)
    );

    if (shouldIgnoreAction) {
        return next(action);
    }

    const enrichedAction = { ...action };
    const isDeletion = type === types.DELETE_POST_SUCCESS;

    enrichedAction.payload = complementPayload(
        payload,
        getState().posts,
        isDeletion
    );

    next(enrichedAction);
};
