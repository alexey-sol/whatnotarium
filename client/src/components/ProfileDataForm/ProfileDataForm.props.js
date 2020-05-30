import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    updatedProfile: null,
    updatedProfileError: null
};

export const propTypes = {
    currentUser: object,
    onSetCurrentUser: func.isRequired,
    onUpdateProfileReset: func.isRequired,
    onUpdateProfileStart: func.isRequired,
    updatedProfile: object,
    updatedProfileError: object
};
