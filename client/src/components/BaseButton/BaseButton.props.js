import { bool, func, oneOf, string } from "prop-types";

export const defaultProps = {
    className: "",
    disabled: false,
    theme: "light",
    width: "auto"
};

export const propTypes = {
    className: string,
    disabled: bool,
    onClick: func,
    theme: oneOf(["light", "dark"]),
    title: string.isRequired,
    width: oneOf(["auto", "full"])
};
