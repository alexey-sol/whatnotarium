import { func, number, object } from "prop-types";

export const defaultProps = {
    post: null,
    userId: undefined
};

export const propTypes = {
    handleClickOnEditButton: func.isRequired,
    post: object,
    userId: number
};
