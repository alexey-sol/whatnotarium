function updatePayload (
    payload = {},
    state = {},
    isDeletion = false
) {
    const { item, items } = payload;
    console.log('-updatePayload payload',payload)
    if (items) {
        return payload;
    }

    const updatedPayload = { ...payload };


    updatedPayload.items = new Map(state.items);

    if (isDeletion) {
        updatedPayload.items.delete(item.id);
        updatedPayload.totalCount = state.totalCount - 1;
    } else {
        const isNewItem = !state.items.get(item.id);

        updatedPayload.items.set(item.id, item);
        updatedPayload.totalCount = (isNewItem)
            ? state.totalCount + 1
            : state.totalCount;
    }
    console.log("-- updated", updatedPayload);
    return updatedPayload;
}

export default updatePayload;
