import React from "react";

import { defaultProps, propTypes } from "./Icon.props";

DislikeActive.defaultProps = defaultProps;
DislikeActive.propTypes = propTypes;

function DislikeActive ({ fill, size }) {
    return (
        <svg
            height={size}
            viewBox="0 0 512 512"
            width={size}
        >
            <path
                d="M117.333,10.667h-64C23.936,10.667,0,34.603,0,64v170.667C0,264.064,23.936,288,53.333,288h96V21.461    C140.395,14.72,129.344,10.667,117.333,10.667z" // eslint-disable-line
                fill={fill}
                fillRule="evenodd"
            />

            <path
                d="M512,208c0-18.496-10.581-34.731-26.347-42.667c3.285-6.549,5.013-13.803,5.013-21.333    c0-18.517-10.603-34.752-26.368-42.688c4.885-9.728,6.315-20.928,3.861-32.043C463.381,47.659,443.051,32,419.819,32H224    c-13.995,0-35.968,4.416-53.333,12.608v228.651l2.56,1.301l61.44,133.12V480c0,3.243,1.472,6.315,3.989,8.341    c0.683,0.512,16.512,12.992,38.677,12.992c24.683,0,64-39.061,64-85.333c0-29.184-10.453-65.515-16.981-85.333h131.776    c28.715,0,53.141-21.248,55.637-48.363c1.387-15.211-3.691-29.824-13.653-40.725C506.923,232.768,512,220.821,512,208z" // eslint-disable-line
                fill={fill}
                fillRule="evenodd"
            />
        </svg>
    );
}

export default DislikeActive;
