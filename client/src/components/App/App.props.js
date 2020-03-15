import PropTypes from "prop-types";

const { func, object } = PropTypes;

export const defaultProps = {
    currentUser: null
};

export const propTypes = {
    checkSessionStart: func.isRequired,
    currentUser: object
};
