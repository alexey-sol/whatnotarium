import { bool, object, oneOf, string } from "prop-types";

export const defaultProps = {
    isFixed: false,
    width: "medium"
};

export const propTypes = {
    elementRef: object.isRequired,
    isFixed: bool,
    text: string.isRequired,
    width: oneOf(["small", "medium", "large"])
};
