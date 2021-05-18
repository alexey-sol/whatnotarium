import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isPending: false,
    user: {}
};

export const propTypes = {
    currentUser: object,
    history: object.isRequired,
    isPending: bool,
    match: object.isRequired,
    onFetchUserStart: func.isRequired,
    user: object
};
