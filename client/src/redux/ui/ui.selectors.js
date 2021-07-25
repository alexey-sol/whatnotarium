import { createSelector } from "reselect";

import { SIGN_IN_START, SIGN_UP_START } from "redux/session/session.types";
import removePostfixFromActionType from "utils/redux/removePostfixFromActionType";

const rawActionsToExclude = [SIGN_IN_START, SIGN_UP_START];
const actionsToExclude = [...rawActionsToExclude.map(removePostfixFromActionType)];

const getUi = ({ ui }) => ui;
const getActionPrefix = (state, actionPrefix) => actionPrefix;

/**
 * Returns true if there's any pending API action is happening, excluding actions
 * passed via "exclude" array.
 * The selector is basically used fot the global loader.
 */
export const selectIsPending = createSelector(
    [getUi],
    ({ pendingApi }, { exclude = actionsToExclude } = {}) => Object
        .keys(pendingApi)
        .filter(item => !exclude.includes(item))
        .length > 0
);

/**
 * Searches for a pending API action group: i.e, any action whose name is starting
 * with "actionPrefix" (like "[posts]", "[users]"...).
 * If "prop" is passed, narrows down the search to find the "pendingApi" property
 * with the passed "prop" value. For most actions however, the value is null.
 * But it may be, say, an ID of the post if the action is to update the post:
 * it may be useful if we need to separate different actions within the same
 * group (for example, separate fetching posts and updating a post).
 */
export const selectRelevantPendingAction = createSelector(
    [getUi, getActionPrefix],
    ({ pendingApi }, { actionPrefix, prop = null } = {}) => {
        let fieldName = null;
        let fieldValue = null;

        if (prop) {
            const [entry = []] = Object.entries(prop);
            ([fieldName, fieldValue] = entry);
        }

        return Object
            .entries(pendingApi)
            .find(([actionType, data]) => {
                const hasRequiredData = (prop)
                    ? data?.[fieldName] === fieldValue
                    : data === null;

                return actionType.startsWith(actionPrefix) && hasRequiredData;
            });
    }
);

export const selectNotification = createSelector(
    [getUi],
    ({ notification }) => notification
);
