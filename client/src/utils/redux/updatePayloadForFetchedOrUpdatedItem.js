function updatePayloadForFetchedOrUpdatedItem (payload = {}, state = {}) {
    const { item } = payload;
    const updatedPayload = { ...payload };

    updatedPayload.items = {
        ...state.items,
        [item.id]: item
    };

    return updatedPayload;
}

export default updatePayloadForFetchedOrUpdatedItem;
