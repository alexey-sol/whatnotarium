import getActionName from "./getActionName";

function makeFailure (type) {
    const actionName = getActionName(type);
    return `${actionName}_FAILURE`;
}

export default makeFailure;
