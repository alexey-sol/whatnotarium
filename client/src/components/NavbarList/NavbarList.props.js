import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    onClose: null
};

export const propTypes = {
    currentUser: object,
    onClose: func
};
