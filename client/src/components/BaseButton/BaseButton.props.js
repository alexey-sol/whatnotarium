import PropTypes from "prop-types";

const { bool, func, oneOf, string } = PropTypes;

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
