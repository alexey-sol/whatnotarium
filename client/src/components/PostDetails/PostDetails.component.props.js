import { func, object } from "prop-types";

export const defaultProps = {
    currentUser: {}
};

export const propTypes = {
    currentUser: object,
    handleClickOnApproveButton: func.isRequired,
    handleClickOnEditButton: func.isRequired,
    handleClickOnRejectButton: func.isRequired,
    post: object.isRequired
};
