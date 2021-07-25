import { bool, func, object } from "prop-types";

export const defaultProps = {
    isPending: false,
    post: {}
};

export const propTypes = {
    deletePost: func.isRequired,
    handleChange: func.isRequired,
    handleSubmit: func.isRequired,
    hideLoader: func.isRequired,
    isPending: bool,
    match: object.isRequired,
    post: object,
    setSelectedPost: func.isRequired,
    showLoader: func.isRequired
};
