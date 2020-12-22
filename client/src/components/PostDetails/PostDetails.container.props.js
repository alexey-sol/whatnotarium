import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    post: {}
};

export const propTypes = {
    currentUser: object,
    history: object.isRequired,
    match: object.isRequired,
    onFetchPostStart: func.isRequired,
    onUpdatePostStart: func.isRequired,
    post: object
};
