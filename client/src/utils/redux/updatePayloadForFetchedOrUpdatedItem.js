function updatePayloadForFetchedOrUpdatedItem (payload = {}, state = {}) {
    const { item } = payload;
    const updatedPayload = { ...payload };
    const isNewItem = !state.items.get(item.id);

    updatedPayload.items = new Map(state.items);
    updatedPayload.items.set(item.id, item);

    if (isNewItem) {
        updatedPayload.totalCount = state.totalCount + 1;
    }

    return updatedPayload;
}

export default updatePayloadForFetchedOrUpdatedItem;
