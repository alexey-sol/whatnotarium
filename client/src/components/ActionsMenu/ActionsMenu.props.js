import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    initialForgotPassIsShown: false,
    initialSearchIsShown: false,
    initialSignInIsShown: false,
    initialSignUpIsShown: false
};

export const propTypes = {
    currentUser: object,
    initialForgotPassIsShown: bool,
    initialSearchIsShown: bool,
    initialSignInIsShown: bool,
    initialSignUpIsShown: bool,
    showUserMenu: func.isRequired
};
