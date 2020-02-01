import PropTypes from "prop-types";

const { bool, func, string } = PropTypes;

export const defaultProps = {
    className: "",
    error: "",
    errorTooltip: "",
    hasFixedTooltip: false,
    label: "",
    rootClassName: "",
    value: ""
};

export const propTypes = {
    className: string,
    error: string,
    errorTooltip: string,
    hasFixedTooltip: bool,
    label: string,
    name: string.isRequired,
    onChange: func.isRequired,
    rootClassName: string,
    value: string
};
