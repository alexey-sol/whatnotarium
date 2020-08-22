import * as types from "./posts.types";
import convertItemsArrayToMap from "utils/redux/convertItemsArrayToMap";
import updatePayloadForCreatedItem from "utils/redux/updatePayloadForCreatedItem";
import updatePayloadForDeletedItem from "utils/redux/updatePayloadForDeletedItem";
import updatePayloadForFetchedOrUpdatedItem from "utils/redux/updatePayloadForFetchedOrUpdatedItem";

export const postsNormalizer = () => (next) => (action) => {
    const { payload, type } = action;
    const actionWithNormalizedPayload = { ...action };

    if (type === types.FETCH_POSTS_SUCCESS) {
        actionWithNormalizedPayload.payload = {
            ...payload,
            items: convertItemsArrayToMap(payload.items)
        };
    }

    next(actionWithNormalizedPayload);
};

export const postsEnricher = ({ getState }) => (next) => (action) => {
    const { payload, type } = action;

    if (payload?.error) {
        return next(action);
    }

    const enrichedAction = { ...action };

    if (type === types.CREATE_POST_SUCCESS) {
        enrichedAction.payload = updatePayloadForCreatedItem(
            payload,
            getState().posts
        );
    } else if (type === types.DELETE_POST_SUCCESS) {
        enrichedAction.payload = updatePayloadForDeletedItem(
            payload,
            getState().posts
        );
    } else if (type === types.FETCH_POST_SUCCESS || type === types.UPDATE_POST_SUCCESS) {
        enrichedAction.payload = updatePayloadForFetchedOrUpdatedItem(
            payload,
            getState().posts
        );
    }

    next(enrichedAction);
};
