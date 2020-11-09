import * as types from "./posts.types";
import { FAILURE_POSTFIX, POSTS_PREFIX, START_POSTFIX } from "utils/const/actionTypeAffixes";
import { setPaging } from "redux/postsPaging/postsPaging.actions";
import complementPayload from "utils/redux/complementPayload";
import convertItemsArrayToMap from "utils/redux/convertItemsArrayToMap";

export const postsNormalizer = () => (next) => (action) => {
    const { payload, type } = action;
    const actionWithNormalizedPayload = { ...action };
    const shouldIgnoreAction = payload?.error || !type.startsWith(POSTS_PREFIX);

    if (shouldIgnoreAction) {
        return next(action);
    }

    if (type === types.FETCH_POSTS_SUCCESS || type === types.SEARCH_POSTS_SUCCESS) {
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

export const postsMapper = ({ dispatch }) => (next) => (action) => {
    const { payload, type } = action;

    const shouldIgnoreAction = ( // TODO: duplicates shouldIgnoreAction in enricher
        payload?.error ||
        !type.startsWith(POSTS_PREFIX) ||
        type.endsWith(START_POSTFIX) ||
        type.endsWith(FAILURE_POSTFIX)
    );

    if (shouldIgnoreAction) {
        return next(action);
    }

    if (type === types.FETCH_POSTS_SUCCESS || type === types.SEARCH_POSTS_SUCCESS) {
        const { items, ...rest } = payload;

        const pagingOptions = {
            ...rest,
            itemIds: [...items.values()].map(({ id }) => id)
        };

        dispatch(setPaging(pagingOptions));
    }

    next(action);
};
