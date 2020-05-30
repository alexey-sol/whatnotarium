import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    updatedProfileError: null
};

export const propTypes = {
    currentUser: object,
    onClearError: func.isRequired,
    onUpdateProfileStart: func.isRequired,
    updatedProfileError: object
};
