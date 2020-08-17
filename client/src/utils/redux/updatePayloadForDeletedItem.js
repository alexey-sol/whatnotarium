import _ from "lodash";

function updatePayloadForDeletedItem (payload = {}, state = {}) {
    const { item } = payload;
    const updatedPayload = { ...payload };

    updatedPayload.items = _.omit(
        state.items,
        item.id
    );

    updatedPayload.totalCount = state.totalCount - 1;

    return updatedPayload;
}

export default updatePayloadForDeletedItem;
