import React from "react";

import { defaultProps, propTypes } from "./Icon.props";

Close.defaultProps = defaultProps;
Close.propTypes = propTypes;

function Close ({ fill, size }) {
    return (
        <svg
            height={size}
            viewBox="0 0 386 386"
            width={size}
        >
            <path
                d="m386.667 45.564-45.564-45.564-147.77 147.769-147.769-147.769-45.564 45.564 147.769 147.769-147.769 147.77 45.564 45.564 147.769-147.769 147.769 147.769 45.564-45.564-147.768-147.77z" // eslint-disable-line
                fill={fill}
                fillRule="evenodd"
            />
        </svg>
    );
}

export default Close;
