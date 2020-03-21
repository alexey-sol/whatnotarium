import React from "react";

import { defaultProps, propTypes } from "./Icon.props";

Bookmark.defaultProps = defaultProps;
Bookmark.propTypes = propTypes;

function Bookmark ({ fill, size }) {
    return (
        <svg
            height={size}
            viewBox="0 0 57 57"
            width={size}
        >
            <path
                d="M52.934,6.136c0-3.324-2.684-6.053-6-6.126V0h-36.91c-3.358,0-6.09,2.731-6.09,6.09v50.778l19-12.666l19,12.666V25h11V6.136 z M39.934,53.132l-17-11.334l-17,11.334V6.09c0-2.255,1.835-4.09,4.09-4.09H42.04c-0.983,0.962-1.682,2.212-1.965,3.611 l-0.001,0.003c-0.045,0.222-0.08,0.448-0.103,0.677C39.947,6.524,39.934,6.761,39.934,7v18V53.132z M50.934,23h-9V7 c0-0.34,0.035-0.671,0.1-0.992c0.387-1.89,1.858-3.399,3.728-3.855c0.036-0.009,0.068-0.025,0.104-0.032 c0.243-0.054,0.498-0.073,0.753-0.089c0.083-0.005,0.162-0.024,0.246-0.025c2.246,0.037,4.069,1.881,4.069,4.129V23z" // eslint-disable-line
                fill={fill}
                fillRule="evenodd"
            />
        </svg>
    );
}

export default Bookmark;
