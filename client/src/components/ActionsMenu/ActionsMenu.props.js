import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    initialSearchIsShown: false,
    initialSignInIsShown: false,
    initialSignUpIsShown: false
};

export const propTypes = {
    currentUser: object,
    initialSearchIsShown: bool,
    initialSignInIsShown: bool,
    initialSignUpIsShown: bool,
    showUserMenu: func.isRequired
};
