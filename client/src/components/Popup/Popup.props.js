import { func, oneOf, string } from "prop-types";

export const defaultProps = {
    isFixed: false,
    text: "",
    theme: "success"
};

export const propTypes = {
    onClose: func.isRequired,
    text: string,
    theme: oneOf(["error", "success", "warning"])
};
