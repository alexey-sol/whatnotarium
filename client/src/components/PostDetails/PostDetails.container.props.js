import { object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    post: null
};

export const propTypes = {
    currentUser: object,
    history: object,
    match: object.isRequired,
    post: object
};
