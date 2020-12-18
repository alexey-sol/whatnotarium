import * as types from "./users.types";
import { FAILURE_POSTFIX, START_POSTFIX, USERS_PREFIX } from "utils/const/actionTypeAffixes";
import convertItemsArrayToMap from "utils/redux/convertItemsArrayToMap";
import enrichPayload from "utils/redux/enrichPayload";

export const usersNormalizer = () => (next) => (action) => {
    const { payload, type } = action;
    const actionWithNormalizedPayload = { ...action };
    const shouldIgnoreAction = payload?.error || !type.startsWith(USERS_PREFIX);

    if (shouldIgnoreAction) {
        return next(action);
    }

    if (type === types.FETCH_USERS_SUCCESS || type === types.SEARCH_USERS_SUCCESS) {
        actionWithNormalizedPayload.payload = {
            ...payload,
            items: convertItemsArrayToMap(payload.items)
        };
    }

    next(actionWithNormalizedPayload);
};

export const usersEnricher = ({ getState }) => (next) => (action) => {
    const { payload, type } = action;

    const shouldIgnoreAction = (
        payload?.error ||
        !type.startsWith(USERS_PREFIX) ||
        type.endsWith(START_POSTFIX) ||
        type.endsWith(FAILURE_POSTFIX)
    );

    if (shouldIgnoreAction) {
        return next(action);
    }

    const enrichedAction = { ...action };
    const isDeletion = type === types.DELETE_USER_SUCCESS;

    enrichedAction.payload = enrichPayload(
        payload,
        getState().users,
        isDeletion
    );

    next(enrichedAction);
};
