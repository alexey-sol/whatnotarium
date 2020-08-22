function updatePayloadForDeletedItem (payload = {}, state = {}) {
    const { item } = payload;
    const updatedPayload = { ...payload };

    updatedPayload.items = new Map(state.items);
    updatedPayload.items.delete(item.id);
    updatedPayload.totalCount = state.totalCount - 1;

    return updatedPayload;
}

export default updatePayloadForDeletedItem;
