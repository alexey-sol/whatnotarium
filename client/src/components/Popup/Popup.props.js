import { func, oneOf, string } from "prop-types";

export const defaultProps = {
    isFixed: false,
    theme: "success"
};

export const propTypes = {
    onClose: func.isRequired,
    text: string.isRequired,
    theme: oneOf(["error", "success", "warning"])
};
