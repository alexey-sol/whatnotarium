import getActionName from "./getActionName";

function makeSuccess (type) {
    const actionName = getActionName(type);
    return `${actionName}_SUCCESS`;
}

export default makeSuccess;
