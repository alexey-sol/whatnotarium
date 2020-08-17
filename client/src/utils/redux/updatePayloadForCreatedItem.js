function updatePayloadForCreatedItem (payload = {}, state = {}) {
    const { item } = payload;
    const updatedPayload = { ...payload };

    updatedPayload.items = {
        ...state.items,
        [item.id]: item
    };

    updatedPayload.totalCount = state.totalCount + 1;

    return updatedPayload;
}

export default updatePayloadForCreatedItem;
