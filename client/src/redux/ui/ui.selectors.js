import { createSelector } from "reselect";

const getUi = ({ ui }) => ui;
const getActionPrefix = (state, actionPrefix) => actionPrefix;

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
