import PropTypes from "prop-types";

const { func, object } = PropTypes;

export const propTypes = {
    currentUser: object,
    showUserMenu: func.isRequired
};
