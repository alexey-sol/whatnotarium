import React from "react";

import { defaultProps, propTypes } from "./Icon.props";

User.propTypes = propTypes;
User.defaultProps = defaultProps;

function User ({ fill, size }) {
    return (
        <svg
            height={size}
            viewBox="0 0 512 512"
            width={size}
        >
            <path
                d="m348.918 37.751c50.334 50.334 50.334 131.942 0 182.276s-131.942 50.334-182.276 0-50.334-131.942 0-182.276c50.334-50.335 131.942-50.335 182.276 0"/><path d="m455.486 350.669c-117.498-79.391-277.917-79.391-395.415 0-17.433 11.769-27.848 31.656-27.848 53.211v111.676h451.111v-111.676c0-21.555-10.416-41.442-27.848-53.211z" // eslint-disable-line
                fill={fill}
                fillRule="evenodd"
            />
        </svg>
    );
}

export default User;
