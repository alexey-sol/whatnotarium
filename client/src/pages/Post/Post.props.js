import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    post: {}
};

export const propTypes = {
    currentUser: object,
    match: object.isRequired,
    onGetPostStart: func.isRequired,
    post: object
};
