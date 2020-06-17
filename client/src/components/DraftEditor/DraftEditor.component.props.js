import {
    bool,
    func,
    object,
    string
} from "prop-types";

export const defaultProps = {
    isPending: false,
    popupText: "",
    post: {}
};

export const propTypes = {
    deletePost: func.isRequired,
    handleChange: func.isRequired,
    handleSubmit: func.isRequired,
    hidePopup: func.isRequired,
    isPending: bool,
    popupText: string,
    post: object
};
