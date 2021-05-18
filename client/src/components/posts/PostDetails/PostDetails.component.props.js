import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: {}
};

export const propTypes = {
    approvePost: func.isRequired,
    currentUser: object,
    handleClickOnEditButton: func.isRequired,
    post: object.isRequired,
    rejectPost: func.isRequired
};
