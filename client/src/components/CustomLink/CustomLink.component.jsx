import { Link } from "react-router-dom";
import React from "react";

import { defaultProps, propTypes } from "./CustomLink.props";
import styles from "./CustomLink.module.scss";

CustomLink.propTypes = propTypes;
CustomLink.defaultProps = defaultProps;

function CustomLink ({ children, ...restProps }) {
    return (
        <span className={styles.container}>
            <Link {...restProps}>
                {children}
            </Link>
        </span>
    );
}

export default CustomLink;
