import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: {},
    error: null,
    post: {}
};

export const propTypes = {
    currentUser: object,
    error: object,
    history: object.isRequired,
    match: object.isRequired,
    onApprovePostStart: func.isRequired,
    onFetchPostStart: func.isRequired,
    onIncrementViewCountStart: func.isRequired,
    onRejectPostStart: func.isRequired,
    onShowNotification: func.isRequired,
    post: object
};
