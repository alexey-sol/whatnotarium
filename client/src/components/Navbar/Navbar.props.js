import { object } from "prop-types";

export const defaultProps = {
    createdPost: {},
    currentUser: null,
    deletedPost: {},
    updatedPost: {}
};

export const propTypes = {
    createdPost: object,
    currentUser: object,
    deletedPost: object,
    updatedPost: object
};
