function updatePayloadForCreatedItem (payload = {}, state = {}) {
    const { item } = payload;
    const updatedPayload = { ...payload };

    updatedPayload.items = new Map(state.items);
    updatedPayload.items.set(item.id, item);
    updatedPayload.totalCount = state.totalCount + 1;

    return updatedPayload;
}

export default updatePayloadForCreatedItem;
