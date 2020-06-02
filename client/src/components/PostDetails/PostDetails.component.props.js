import {
    func,
    number,
    object,
    string
} from "prop-types";

export const defaultProps = {
    popupText: "",
    popupTheme: "",
    post: null,
    userId: undefined
};

export const propTypes = {
    handleClickOnEditButton: func.isRequired,
    hidePopup: func.isRequired,
    popupText: string,
    popupTheme: string,
    post: object,
    userId: number
};
