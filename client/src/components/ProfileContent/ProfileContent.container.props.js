import { func, object } from "prop-types";

export const defaultProps = {
    deletedPost: {},
    updatedProfile: {}
};

export const propTypes = {
    deletedPost: object,
    onDeletePostReset: func.isRequired,
    onSetCurrentUser: func.isRequired,
    updatedProfile: object
};
