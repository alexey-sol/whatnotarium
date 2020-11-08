import * as types from "./usersPaging.types";
import reduce from "utils/redux/reduce";

const INITIAL_STATE = {
    count: 20,
    currentPage: 1,
    itemIds: [],
    totalCount: 0
};

export default reduce(INITIAL_STATE, {
    [types.SET_CURRENT_PAGE]: onSetCurrentPage,
    [types.SET_PAGING]: onSetPaging
});

function onSetCurrentPage (state, { payload }) {
    return {
        ...state,
        currentPage: payload
    };
}

function onSetPaging (state, { payload }) {
    return {
        ...state,
        ...payload
    };
}
