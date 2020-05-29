import { createSelector } from "reselect";

const getPending = ({ pending }) => pending;

const selectPending = createSelector(
    [getPending],
    (pending) => pending
);

export {
    selectPending
};
