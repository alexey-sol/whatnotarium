import { func, object } from "prop-types";

export const defaultProps = {
    updatedProfile: {}
};

export const propTypes = {
    currentUser: object.isRequired,
    onSetCurrentUser: func.isRequired,
    updatedProfile: object
};
