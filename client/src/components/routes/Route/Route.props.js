import { elementType, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    sessionError: null
};

export const propTypes = {
    component: elementType,
    currentUser: object,
    sessionError: object
};
