import PropTypes from "prop-types";

const { func, object } = PropTypes;

export const propTypes = {
    checkUserSession: func,
    currentUser: object
};
