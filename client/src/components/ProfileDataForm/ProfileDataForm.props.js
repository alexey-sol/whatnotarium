import { bool, func, object } from "prop-types";

export const defaultProps = {
    isPending: false,
    notification: null
};

export const propTypes = {
    currentUser: object.isRequired,
    isPending: bool,
    notification: object,
    onUpdateUserStart: func.isRequired
};
