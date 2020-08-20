import { bool, func, object } from "prop-types";

export const defaultProps = {
    isPending: false,
    popupText: "",
    post: {}
};

export const propTypes = {
    deletePost: func.isRequired,
    handleChange: func.isRequired,
    handleSubmit: func.isRequired,
    isPending: bool,
    post: object,
    setSelectedPost: func.isRequired
};
