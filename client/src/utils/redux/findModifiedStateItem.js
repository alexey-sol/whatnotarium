function findModifiedStateItem (...stateItems) {
    return stateItems.find(elem => elem?.item || elem?.error) || {};
}

export default findModifiedStateItem;
