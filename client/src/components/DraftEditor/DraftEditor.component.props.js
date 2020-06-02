import {
    bool,
    func,
    object,
    string
} from "prop-types";

export const defaultProps = {
    isFetching: false,
    popupText: "",
    post: {}
};

export const propTypes = {
    deletePost: func.isRequired,
    handleChange: func.isRequired,
    handleSubmit: func.isRequired,
    hidePopup: func.isRequired,
    isFetching: bool,
    popupText: string,
    post: object
};
