import { func, number, object } from "prop-types";

export const defaultProps = {
    currentUserId: null
};

export const propTypes = {
    currentUserId: number,
    handleClickOnEditButton: func.isRequired,
    post: object.isRequired
};
