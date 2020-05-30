import getActionName from "./getActionName";

function getActionNames (actionTypes = {}) {
    const actionNames = {};

    for (const type in actionTypes) {
        if (type) {
            const actionName = getActionName(type);
            actionNames[actionName] = actionName;
        }
    }

    return actionNames;
}

export default getActionNames;
