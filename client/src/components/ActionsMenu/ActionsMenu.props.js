import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    initialSignInIsShown: false,
    initialSignUpIsShown: false
};

export const propTypes = {
    currentUser: object,
    initialSignInIsShown: bool,
    initialSignUpIsShown: bool,
    showUserMenu: func.isRequired
};
