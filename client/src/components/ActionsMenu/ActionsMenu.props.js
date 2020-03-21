import { func, object } from "prop-types";

export const propTypes = {
    currentUser: object,
    showUserMenu: func.isRequired
};
