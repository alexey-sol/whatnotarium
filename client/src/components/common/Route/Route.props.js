import { elementType, object } from "prop-types";

export const defaultProps = {
    currentUser: null
};

export const propTypes = {
    component: elementType,
    currentUser: object
};
