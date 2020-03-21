import PropTypes from "prop-types";

const { elementType, object } = PropTypes;

export const defaultProps = {
    currentUser: null
};

export const propTypes = {
    component: elementType,
    currentUser: object
};
