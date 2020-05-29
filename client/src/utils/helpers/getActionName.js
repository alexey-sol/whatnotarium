function getActionName (actionType) {
    if (typeof actionType !== "string") {
        return null;
    }

    const lastElem = -1;

    return actionType
        .split("_")
        .slice(0, lastElem)
        .join("_");
}

export default getActionName;
