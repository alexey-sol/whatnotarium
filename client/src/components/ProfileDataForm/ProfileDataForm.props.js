import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    updatedProfile: {}
};

export const propTypes = {
    currentUser: object,
    onUpdateProfileReset: func.isRequired,
    onUpdateProfileStart: func.isRequired,
    updatedProfile: object
};
