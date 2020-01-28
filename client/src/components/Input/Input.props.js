import PropTypes from "prop-types";

const { func, string } = PropTypes;

export const defaultProps = {
    className: "",
    label: "",
    rootClassName: "",
    value: ""
};

export const propTypes = {
    className: string,
    label: string,
    name: string.isRequired,
    onChange: func.isRequired,
    rootClassName: string,
    value: string
};
