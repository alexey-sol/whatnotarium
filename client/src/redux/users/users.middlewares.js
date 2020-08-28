import * as types from "./users.types";
import { USERS_PREFIX } from "../../utils/const/actionTypeAffixes";
import convertItemsArrayToMap from "utils/redux/convertItemsArrayToMap";
import updatePayloadForCreatedItem from "utils/redux/updatePayloadForCreatedItem";
import updatePayloadForDeletedItem from "utils/redux/updatePayloadForDeletedItem";
import updatePayloadForFetchedOrUpdatedItem from "utils/redux/updatePayloadForFetchedOrUpdatedItem";

export const usersNormalizer = () => (next) => (action) => {
    const { payload, type } = action;
    const actionWithNormalizedPayload = { ...action };
    const shouldIgnoreAction = payload?.error || !type.startsWith(USERS_PREFIX);

    if (shouldIgnoreAction) {
        return next(action);
    }

    if (type === types.FETCH_USERS_SUCCESS) {
        actionWithNormalizedPayload.payload = {
            ...payload,
            items: convertItemsArrayToMap(payload.items)
        };
    }

    next(actionWithNormalizedPayload);
};

export const usersEnricher = ({ getState }) => (next) => (action) => {
    const { payload, type } = action;
    const shouldIgnoreAction = payload?.error || !type.startsWith(USERS_PREFIX);

    if (shouldIgnoreAction) {
        return next(action);
    }

    const enrichedAction = { ...action };

    if (type === types.CREATE_USER_SUCCESS) {
        enrichedAction.payload = updatePayloadForCreatedItem(
            payload,
            getState().users
        );
    } else if (type === types.DELETE_USER_SUCCESS) {
        enrichedAction.payload = updatePayloadForDeletedItem(
            payload,
            getState().users
        );
    } else if (type === types.FETCH_USER_SUCCESS || type === types.UPDATE_USER_SUCCESS) { // TODO
        enrichedAction.payload = updatePayloadForFetchedOrUpdatedItem(
            payload,
            getState().users
        );
    }

    next(enrichedAction);
};
