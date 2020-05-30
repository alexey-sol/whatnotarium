import getActionName from "./getActionName";

function getActionNames (actionTypes = {}) {
    return Object
        .keys(actionTypes)
        .reduce((actionNames, type) => {
            const actionName = getActionName(type);
            return {
                ...actionNames,
                [actionName]: actionName
            };
        }, {});
}

export default getActionNames;
