import React from "react";

import { defaultProps, propTypes } from "./Icon.props";

Menu.defaultProps = defaultProps;
Menu.propTypes = propTypes;

function Menu ({ fill, size }) {
    return (
        <svg
            height={size}
            viewBox="0 0 612 612"
            width={size}
        >
            <path
                d="M0,95.625v38.25h612v-38.25H0z M0,325.125h612v-38.25H0V325.125z M0,516.375h612v-38.25H0V516.375z" // eslint-disable-line
                fill={fill}
                fillRule="evenodd"
            />
        </svg>
    );
}

export default Menu;
