import PropTypes from "prop-types";

const { func, object } = PropTypes;

export const defaultProps = {
    currentUser: {}
};

export const propTypes = {
    checkUserSession: func.isRequired,
    currentUser: object
};
