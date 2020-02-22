import PropTypes from "prop-types";

const { func, object } = PropTypes;

export const propTypes = {
    checkSession: func,
    currentUser: object
};
