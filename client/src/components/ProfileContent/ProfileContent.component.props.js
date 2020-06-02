import { func, string } from "prop-types";

export const defaultProps = {
    popupText: "",
    popupTheme: ""
};

export const propTypes = {
    hidePopup: func.isRequired,
    popupText: string,
    popupTheme: string
};
