import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    error: null,
    user: {}
};

export const propTypes = {
    currentUser: object,
    error: object,
    history: object.isRequired,
    match: object.isRequired,
    onFetchUserStart: func.isRequired,
    user: object
};
