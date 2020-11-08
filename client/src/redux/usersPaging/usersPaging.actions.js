import * as types from "./usersPaging.types";

export function setCurrentPage (payload) {
    return {
        payload,
        type: types.SET_CURRENT_PAGE
    };
}

export function setPaging (payload) {
    return {
        payload,
        type: types.SET_PAGING
    };
}
