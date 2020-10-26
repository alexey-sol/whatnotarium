import { createSelector } from "reselect";

const getUi = ({ ui }) => ui;
const getActionPrefix = (state, actionPrefix) => actionPrefix;

export const selectRelevantPendingAction = createSelector(
    [getUi, getActionPrefix],
    ({ pendingApi }, actionPrefix, field = {}) => {
        const [entry = []] = Object.entries(field);
        const [fieldName, fieldValue] = entry;

        return Object
            .entries(pendingApi)
            .find(([actionType, data]) => {
                const hasRequiredData = (fieldValue)
                    ? data?.[fieldName] === fieldValue
                    : !data?.[fieldName];

                return actionType.startsWith(actionPrefix) && hasRequiredData;
            });
    }
);

export const selectNotification = createSelector(
    [getUi],
    ({ notification }) => notification
);
