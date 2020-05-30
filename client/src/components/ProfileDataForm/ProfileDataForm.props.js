import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    updatedProfileError: null,
    updatedProfilePending: {}
};

export const propTypes = {
    currentUser: object,
    onUpdateProfileReset: func.isRequired,
    onUpdateProfileStart: func.isRequired,
    updatedProfileError: object,
    updatedProfilePending: object
};
